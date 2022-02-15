import styles from '../../css/Articles&Comments.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faCommentDots,
  faEllipsis,
  faTrashCan,
  faClose,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { updateArticleVote, updateCommentVote } from '../../utils/api';
import { useEffect, useRef, useState } from 'react';

export const VoteBtn = ({ size, component, newVote, setNewVote }) => {
  const [componentId, setComponentId] = useState('');
  const ref = useRef(newVote);

  const voteHandler = () => {
    setNewVote((currVote) => (currVote === -1 ? 1 : -1));
    component.votes = component.votes + ref.current;
    component.hasOwnProperty('article_id')
      ? setComponentId('article_id')
      : setComponentId('comment_id');
  };

  useEffect(() => {
    if (componentId === 'article_id') {
      updateArticleVote(component[componentId], { inc_votes: ref.current });
    } else if (componentId === 'comment_id') {
      updateCommentVote(component[componentId], { inc_votes: ref.current });
    }
    ref.current = newVote;
  }, [newVote]);

  return (
    <button className={styles.vote}>
      <FontAwesomeIcon
        icon={faThumbsUp}
        size={size}
        color={newVote === -1 ? '#ff9933' : ''}
        title='Like'
        onClick={voteHandler}
      />
    </button>
  );
};

export const AddCommentBtn = ({ size, setIsOpen }) => {
  return (
    <button className={styles.add__comment}>
      <FontAwesomeIcon
        icon={faCommentDots}
        size={size}
        color='#ada9a9'
        title='Add Comment'
        onClick={() => setIsOpen((currOpen) => !currOpen)}
      />
    </button>
  );
};

export const EditBtn = ({ size, item }) => {
  return (
    <button className={styles.edit__comment}>
      <FontAwesomeIcon
        icon={faEllipsis}
        size={size}
        color='#ada9a9'
        title={`Edit ${item}`}
      />
    </button>
  );
};

export const DeleteBtn = ({ size, item, deleteItem }) => {
  return (
    <button className={styles.delete__comment}>
      <FontAwesomeIcon
        icon={faTrashCan}
        size={size}
        color='#ada9a9'
        title={`Delete ${item}`}
        className={styles.vote}
        onClick={deleteItem}
      />
    </button>
  );
};

export const CloseBtn = ({ size, closeEvent }) => {
  return (
    <button type='button' className={styles.close__btn}>
      <FontAwesomeIcon
        icon={faClose}
        size={size}
        color='#a8a1a1'
        title='Close'
        onClick={closeEvent}
      />
    </button>
  );
};

export const AvatarIcon = ({ size, className }) => {
  return (
    <FontAwesomeIcon
      icon={faUserCircle}
      size={size}
      color='#ada9a9'
      className={className}
    />
  );
};

export const SubmitBtn = (classname, text) => {
  return <button className={`${classname}`}>{text}</button>;
};
