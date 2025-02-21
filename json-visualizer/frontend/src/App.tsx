import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import JsonNode from './components/JsonNode';
import 'reactflow/dist/style.css';
import { ParseJSON } from '../wailsjs/go/main/App';
import { Container, Sidebar, JsonInput, ParseButton, FlowContainer, ErrorMessage } from './styles';
import CustomNode from './components/CustomNode';
import Layout from './components/Layout';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string>('');

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setError('');
  };

  const handleParse = useCallback(async () => {
    try {
      const result = await ParseJSON(jsonInput);
      if (result) {
        setNodes(result.nodes.map(node => ({
          ...node,
          type: node.type === 'default' ? undefined : node.type,
          position: {
            x: Number(node.position.x),
            y: Number(node.position.y)
          }
        })));
        setEdges(result.edges);
        setError('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse JSON');
      setNodes([]);
      setEdges([]);
    }
  }, [jsonInput, setNodes, setEdges]);

  const nodeTypes = {
    default: CustomNode,
    object: CustomNode,
    array: CustomNode,
  };

  return (
    <Layout>
      <Container>
        <Sidebar>
          <h2>JSON Input</h2>
          <JsonInput
            value={jsonInput}
            onChange={handleJsonChange}
            placeholder="Paste your JSON here..."
          />
          <ParseButton onClick={handleParse}>Parse JSON</ParseButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Sidebar>
        <FlowContainer>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            defaultEdgeOptions={{
              style: { strokeWidth: 2 },
              type: 'smoothstep',
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#999',
              },
            }}
            nodesDraggable={true}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </FlowContainer>
      </Container>
    </Layout>
  );
}

export default App;