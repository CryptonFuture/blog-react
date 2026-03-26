import React from 'react'
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { Posts } from "../../pages/Post/Posts";
import { Tags } from "../../pages/Tag/Tags";
import { Pages } from "../../pages/Pages/Pages";
import { Users } from "../../pages/Users/Users";
import { Permission } from "../../pages/Permission/Permission";
import { Request } from "../../pages/Request/Request";
import { ContactUs } from "../../pages/ContactUs/ContactUs";
import { Logs } from '../../pages/Logs/Logs';

export const Contents = ({ activeKey }: { activeKey: string }) => {
  console.log(activeKey, 'activeKey');
  
  const renderByKey = (key: string) => {
    switch (key) {
     
      case "1":
        return <Dashboard />;
      case "2":
        return <Posts />;
      case "3":
        return <Tags />;
      case "4":
        return <Pages />;
      case "5":
        return <Users />
      case "6":
        return <Logs />
      case "10":
        return <Permission />;
      case "11":
        return <Request />;
      case "12":
        return <ContactUs />;
      
      default:
        return <div>Select a menu</div>;
    }
  };
  return <>{renderByKey(activeKey)}</>

}
