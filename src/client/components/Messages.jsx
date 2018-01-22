import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import styled from 'styled-components';

import io from 'socket.io-client';
import config from 'config';
let socket = io(`${config.api.host}:${config.api.port}`);

const Log = styled.div`
    color: rgba(255,255,255, 0.2);
    padding: 0 5px;
    font-style: italic;
    font-size: 12px;
`
const MessagesWrapper = styled.div`
    max-height: 80vh;
    height: 400px;
    overflow-y: auto;
    background: rgba(255,255,255,0.04);
    font-size: 14px;
`
const Message = styled.div`
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: ${props => props.me ? 'rgba(255, 255, 255, 0.2)' : 'inherit'}
`
const MessageHeader = styled.div`
    font-size: 12px;
    margin-top: 5px;
    padding: 0 5px;
`
const MessageAuthor = styled.span`
    font-weight: bold
`
const MessageTime = styled.span`
    font-size: 10px;
`

const MessageBody = styled.div`
    padding: 0 5px;
`

@connect(state => ({ chat: state.chat }))
export class Messages extends Component {

    constructor(props) {
        super(props);
        this._messageTemplate = this._messageTemplate.bind(this);
    }

    _messageTemplate(msg, k) {
        const { name } = this.props.chat.user;

        if (msg.type == 'log')
            return <Log key={k}>{msg.value}</Log>

        const time = new Date(msg.time).toLocaleTimeString();
        const amIAuthor = (msg.user === this.props.chat.user.name);

        return <Message key={k} me={amIAuthor}>
            <MessageHeader>
                <MessageAuthor>{msg.user}</MessageAuthor> <MessageTime>({time})</MessageTime>
            </MessageHeader>
            <MessageBody>{msg.value}</MessageBody>
        </Message>
    }

    componentDidMount() {
        const { dispatch } = this.props;

        socket.on('server:message', (response) => {
            dispatch({ type: 'NEW_MESSAGE', response })
        });
    }

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight
        }
    }

    render() {
        const collection = this.props.chat.messages;
        return (
            <MessagesWrapper>
                {collection.map((msg, k) => this._messageTemplate(msg, k))}
            </MessagesWrapper>
        );
    }
}