import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#FcFcFc",
    borderColor: 'green',
  }

 

  return (
  <>
    {notification && <div style={style}> {notification}</div>}
  </>
  ) 

}

export default Notification;