import styled, { css } from 'styled-components';
import { darken } from 'polished'
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  border: 0;
  background: none;
  position: relative;

${props => props.hasUnread && css`
  &::after {
    position: absolute;
    right: 0;
    top: 0;
    width: 8px;
    height: 8px;
    background: #FF892e;
    content: '';
    border-radius: 50%;
  }
`}
`;

export const NotificationList = styled.div`
  position: absolute;
  width: 260px;
  left: calc(50% - 135px);
  top: calc(100% + 30px);
  background: rgba(228, 63, 90, 0.6);
  border-radius: 4px;
  padding: 15px 5px;

  display: ${props => props.visible ? 'block' : 'none' };

  &::before{
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(228, 63, 90, 0.6);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 230px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #FFF;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.7;
    margin-bottom: 5px;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${darken(0.1, '#FFF')};
  }

  ${props => props.unRead && css`
    &::after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #FF892e;
      border-radius: 50%;
      margin-left: 10px;
    }
  `}

`;

