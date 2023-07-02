import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';

const App = ({ isSignedIn, issues, wallet }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    issues.getMessages().then(setMessages);
  }, []);

  onSubmit = async (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    await issues.addMessage(message.value, donation.value)
    const messages = await issues.getMessages()

    setMessages(messages);
    message.value = '';
    donation.value = '0';
    fieldset.disabled = false;
    message.focus();
  };

  const signIn = () => { wallet.signIn() }

  const signOut = () => { wallet.signOut() }

  return (
    <main>
      <table>
        <tr>
          <td><h1>Github Issue Hunt</h1></td>
          <td>{ isSignedIn
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }</td>
        </tr>
      </table>

      <hr />
      { isSignedIn
        ? <Form onSubmit={onSubmit} currentAccountId={wallet.accountId} />
        : <SignIn/>
      }

      <hr />

      { !!messages.length && <Messages messages={messages}/> }

    </main>
  );
};

export default App;