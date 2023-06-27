import React from "react";
import NameComponent from "../UserName/NameComponent";
import Timeago from "react-timeago";
import Card from "../../Card/Card";

export default function NotificationCard(props) {
  const notifications = props.notificationData;
  return (
    <>
      <div className="">
        <p className="text-center font-semibold text-xl">Notifications</p>
      </div>
      {notifications &&
        notifications.map((obj) => (
          <Card>
            <div className="ml-1 flex h-13 items-center">
              <div className="text-base flex item-center font-medium">
                <p className=" ">
                  <NameComponent posterId={obj.senderName._id} />
                </p>
                <p className="mt-4 text-gray-600 ml-2 ">{obj.message}</p>
              </div>

              <p className="font-medium ml-3 text-base text-blue-500">
                <Timeago date={obj.createdAt} />
              </p>
            </div>
          </Card>
        ))}
    </>
  );
}
