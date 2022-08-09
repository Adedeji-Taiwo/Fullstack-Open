import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  
  if(notification.length > 0) {
    return (
      <div style={style}>
      {`You voted '${notification[0].notification}'`}
    </div>
    )
} 


  return (
    <></>
  ) 

}

export default Notification;