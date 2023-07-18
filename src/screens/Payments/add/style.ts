import styled from "styled-components";
import { COLORS } from "../../../constants/COLORS";

export const Container = styled.div`
  padding: 10px;
`;

export const Title = styled.div`
  color: #00073d;
  font-size: 2rem;
  font-weight: 700;
`;

export const SpaceBetween = styled.div`
  display: flex;
  margin: 2rem 0;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.div<{ loading?: boolean }>`
  color: #00073d;
  font-size: 0.8rem;
  text-transform: capitalize;
  margin-left: ${({ loading }) => (!!loading ? "20px" : 0)};
`;

export const Bottom = styled.div<{ loading?: boolean }>`
  display: flex;
  margin-top: 2rem;
`;

export const styles = {
  btn: { color: COLORS.BLUE, borderColor: COLORS.BLUE },
};