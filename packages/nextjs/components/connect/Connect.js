

import React, {useEffect, useState} from "react";
import styles from "../connect/connectStyles.module.css";
import Image from "next/image";
import {HeaderData} from "../../constants/constants";


export const Connect = () => {

  return (
    <div className={styles["connect-container"]}>
      <div className={styles["connect-image"]}>
        <Image
          src={HeaderData.image}
          height={280}
          width={300}
          className={styles["image"]}
          alt="header"
        />
      </div>
      <div className={styles["connect-content-container"]}>
       
        <div className={styles["connect-image"]}>
        <Image
          src={HeaderData.image2}
          height={200}
          width={500}
          className={styles["image"]}
          alt="header"
          priority={true}
        />
      </div>

        <p className={styles["connect-content-description"]}>
          {HeaderData.text}
        </p>
      </div>
      <div className={styles["connect-button-container"]}>
        <button  className={styles["connect-button"]} >
          {
          
          HeaderData.buttonText="Burn Now!"
          
          }
        </button>
      </div>
    </div>
  );
};

export default Connect;
