import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import styled from '@emotion/styled';

const NodeContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ccc;
  min-width: 150px;
  max-width: 300px;
`;

const NodeLabel = styled.div<{ isValue: boolean }>`
  color: ${props => props.isValue ? '#2196f3' : '#e91e63'};
  font-weight: ${props => props.isValue ? 'normal' : 'bold'};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 14px;
`;

interface JsonNodeProps {
  data: {
    label: string;
    isValue: boolean;
  };
}

const JsonNode = memo(({ data }: JsonNodeProps) => {
  return (
    <NodeContainer>
      <Handle type="target" position={Position.Left} />
      <NodeLabel isValue={data.isValue}>{data.label}</NodeLabel>
      <Handle type="source" position={Position.Right} />
    </NodeContainer>
  );
});

export default JsonNode;