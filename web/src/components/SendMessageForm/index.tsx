import { useContext, useState, FormEvent, useEffect } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import { Shake } from 'reshake'

import styles from './styles.module.scss'


export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [animationShake, setAnimationShake] = useState(false);

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      setAnimationShake(true);
      return;
    }

    await api.post('messages', { message })

    setMessage('')
  }

  useEffect(() => {
    if (animationShake) {
      setTimeout(() => {
        setAnimationShake(false);
      }, 3000)
    }
  }, [animationShake])

  return (
    <Shake h={10} v={0} r={3} active={animationShake} fixed="true" q={1} className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.signedUserInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form
        onSubmit={handleSendMessage}
        className={styles.sendMessageForm}
      >
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          placeholder="Share your thoughts"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        <button

          type="submit"
        >
          Send
        </button>
      </form>
    </Shake>
  );
}