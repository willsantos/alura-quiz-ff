import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

ButtonBase.propTypes = {
  type: PropTypes.oneOf(["submit", "type", "button"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default function Button({ children, ...props }) {
  return (
    <div>
      {!props.disabled && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ButtonBase {...props}>{children}</ButtonBase>
        </motion.div>
      )}
      {props.disabled && <ButtonBase {...props}>{children}</ButtonBase>}
    </div>
  );
}
