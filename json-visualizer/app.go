package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
)

// Node represents a node in the JSON visualization
type Node struct {
	ID       string                 `json:"id"`
	Type     string                 `json:"type"`
	Position map[string]interface{} `json:"position"`
	Data     map[string]interface{} `json:"data"`
}

// Edge represents a connection between nodes
type Edge struct {
	ID     string `json:"id"`
	Source string `json:"source"`
	Target string `json:"target"`
}

// GraphData represents the complete visualization data
type GraphData struct {
	Nodes []Node `json:"nodes"`
	Edges []Edge `json:"edges"`
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// ParseJSON parses the input JSON and returns visualization data
func (a *App) ParseJSON(jsonStr string) (*GraphData, error) {
	// Parse the input JSON string
	var data interface{}
	if err := json.Unmarshal([]byte(jsonStr), &data); err != nil {
		return nil, fmt.Errorf("invalid JSON: %v", err)
	}

	// Initialize graph data
	graph := &GraphData{
		Nodes: make([]Node, 0),
		Edges: make([]Edge, 0),
	}

	// Process the JSON data recursively
	processNode(data, "root", "0", graph)

	return graph, nil
}

// processNode recursively processes JSON data and builds the graph
func processNode(data interface{}, parentID string, idPrefix string, graph *GraphData) string {
    currentID := idPrefix

    // Calculate depth based on ID segments
    depth := len(strings.Split(idPrefix, "_")) - 1
    horizontalSpacing := 600.0
    verticalSpacing := 200.0

    nodeIndex := 0
    for _, node := range graph.Nodes {
        if len(strings.Split(node.ID, "_")) - 1 == depth {
            nodeIndex++
        }
    }

    depthOffset := float64(depth) * 100.0

    switch v := data.(type) {
    case map[string]interface{}:
        // Create object node
        node := Node{
            ID:   currentID,
            Type: "object",
            Position: map[string]interface{}{
                "x": float64(nodeIndex) * horizontalSpacing + depthOffset,
                "y": float64(depth) * verticalSpacing,
            },
            Data: map[string]interface{}{},
        }

        // Get the object name from the parent's key
        objectName := strings.TrimPrefix(strings.TrimPrefix(currentID, parentID+"_"), "0_")
        if objectName != "" {
            node.Data["label"] = objectName + "\n"
        }

        // Process all key-value pairs
        primitiveData := make(map[string]interface{})
        for key, value := range v {
            switch value.(type) {
            case map[string]interface{}, []interface{}:
                // Process complex types separately
                childID := fmt.Sprintf("%s_%s", currentID, key)
                processNode(value, currentID, childID, graph)
                // Add edge
                graph.Edges = append(graph.Edges, Edge{
                    ID:     fmt.Sprintf("e%s-%s", currentID, childID),
                    Source: currentID,
                    Target: childID,
                })
            default:
                // Collect primitive values
                primitiveData[key] = value
            }
        }

        // Add collected primitive values to node data
        if len(primitiveData) > 0 {
            existingLabel, _ := node.Data["label"].(string)
            node.Data["label"] = existingLabel + formatPrimitiveData(primitiveData)
        }
        graph.Nodes = append(graph.Nodes, node)

    case []interface{}:
        // Create array node
        arrayName := strings.TrimPrefix(strings.TrimPrefix(currentID, parentID+"_"), "0_")
        node := Node{
            ID:   currentID,
            Type: "array",
            Position: map[string]interface{}{
                "x": float64(nodeIndex) * horizontalSpacing + depthOffset,
                "y": float64(depth) * verticalSpacing,
            },
            Data: map[string]interface{}{
                "label": arrayName,
            },
        }
        graph.Nodes = append(graph.Nodes, node)

        // Process array elements
        for i, value := range v {
            childID := fmt.Sprintf("%s_%d", currentID, i)
            processNode(value, currentID, childID, graph)
            graph.Edges = append(graph.Edges, Edge{
                ID:     fmt.Sprintf("e%s-%s", currentID, childID),
                Source: currentID,
                Target: childID,
            })
        }

    default:
        // Create leaf node for primitive values
        node := Node{
            ID:   currentID,
            Type: "default",
            Position: map[string]interface{}{
                "x": float64(nodeIndex) * horizontalSpacing + depthOffset,
                "y": float64(depth) * verticalSpacing,
            },
            Data: map[string]interface{}{
                "label": fmt.Sprintf("%v", v),
            },
        }
        graph.Nodes = append(graph.Nodes, node)
    }

    return currentID
}

// formatPrimitiveData formats primitive key-value pairs into a readable string
func formatPrimitiveData(data map[string]interface{}) string {
	var pairs []string
	for k, v := range data {
		pairs = append(pairs, fmt.Sprintf("%s: %v", k, v))
	}
	return strings.Join(pairs, "\n")
}
