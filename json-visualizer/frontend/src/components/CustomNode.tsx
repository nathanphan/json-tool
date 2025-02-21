import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import styled from '@emotion/styled';

const NodeContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  min-width: 150px;
  background: white;
  border: 2px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Monaco', monospace;
`;

const ObjectNode = styled(NodeContainer)`
  border-color: #4a90e2;
  background: #f8f9fa;
`;

const ArrayNode = styled(NodeContainer)`
  border-color: #9b59b6;
  background: #f8f9fa;
`;

const DefaultNode = styled(NodeContainer)`
  border-color: #2ecc71;
  background: #f8f9fa;
`;

const NodeLabel = styled.div`
  white-space: pre-wrap;
  text-align: left;
  line-height: 1.4;
  
  .property {
    color: #e74c3c;
    font-weight: bold;
  }
  
  .value {
    color: #27ae60;
  }

  .object-name {
    color: #f39c12;
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 4px;
  }
`;

const CustomNode = ({ data, type }: NodeProps<NodeData>) => {
  const NodeComponent = type === 'object' 
    ? ObjectNode 
    : type === 'array' 
      ? ArrayNode 
      : DefaultNode;

  const formatLabel = (label: string) => {
    if (typeof label !== 'string') return label;
    
    const lines = label.split('\n');
    const [firstLine, ...restLines] = lines;
    
    return (
      <>
        {firstLine && firstLine.trim() && !firstLine.match(/^\d+$/) && (
          <div className="object-name">{firstLine}</div>
        )}
        {restLines.map((line, i) => {
          const [property, value] = line.split(': ');
          return value ? (
            <div key={i}>
              <span className="property">{property}</span>: <span className="value">{value}</span>
            </div>
          ) : (
            line && <div key={i}>{line}</div>
          );
        })}
      </>
    );
  };

  return (
    <NodeComponent>
      <Handle type="target" position={Position.Top} />
      <NodeLabel>{formatLabel(data.label)}</NodeLabel>
      <Handle type="source" position={Position.Bottom} />
    </NodeComponent>
  );
};

export default memo(CustomNode);