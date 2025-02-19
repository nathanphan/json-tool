import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    margin: 0;
    color: #333;
  }
`;

export const JsonInput = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

export const ParseButton = styled.button`
  padding: 12px 24px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976d2;
  }

  &:active {
    background-color: #1565c0;
  }
`;

export const FlowContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #fafafa;
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 12px;
  background-color: #ffebee;
  border-radius: 4px;
  font-size: 14px;
`;