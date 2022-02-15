import React, { useState, useEffect } from 'react';
import ParticipationRequestsStyle from './ParticipationRequests.css'
import Header from '../../components/header/Header';
import RequestCard from '../../components/requestCard/RequestCard';

function ParticipationRequests({ getNotificationsOfUser, acceptTransfer }) {

  const [notifications, setNotifications] = useState([])
  const [notificationLoaded, setNotificationLoaded] = useState(false)

  useEffect(() => {
    getNotificationsOfUser().then((res) => {
      console.log(res)
      let allNotifications = [];
      res.forEach(d => {
        const notification = {
          "notiType": d[0],
          "notiId": d[1],
          "timeStamp": d[2],
          "senderAddress": d[3],
          "senderName": d[4],
          "receiverAddress": d[5],
          "receiverName": d[6],
          "productNo": d[7],
          "productName": d[7].split("_")[0],
          "supplychainId": d[9],
          "batchesToTransfer": d[10],
          "unitsPerBatch": d[11],
          "firstBatch": d[12],
          "lastBatch": d[13],
          "exists": d[14]
        }
        console.log(notification);
        console.log("here notifications", notifications);
        allNotifications = [...allNotifications, notification]
      });
      setNotifications(allNotifications);
      setNotificationLoaded(true);
    })
  }, [])

  useEffect(() => {
    console.log(notifications)
  }, [notifications])

  return(
    <div>
      <Header title='Participation Requests' />

      {notifications && notifications.map((d) => {
        return (
          d.exists &&
          <div className='right-window'>
            <RequestCard
              acceptTransfer={acceptTransfer}
              notiId={d.notiId}
              sender={d.senderName}
              date={d.timeStamp}
              product={d.productName}
              batches={d.batchesToTransfer}
            />
          </div>
          );
        }
      )
      }
    
      </div>
  );
}

export default ParticipationRequests;
