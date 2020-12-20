import React, { useState, useEffect } from 'react';
import './CryptoFunctional.css';

import axios from 'axios';
import CryptoList from './CryptoList'; 

const CryptoFunctional = (props) => {

    const [cryptoList, setCryptoList] = useState([]);

    const [filteredCryptoList, setFilterCryptoList] = useState([]);

    useEffect(() => {
        let timerID = setInterval(() => getCryptoData(), 5000);

        return(() => {
            clearInterval(timerID);
        })
    });

    const getCryptoData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(res => {
                const tickers = res.data;

                
                    let newCryptoList = [];

                    for (const [ticker, cryptoRate] of Object.entries(tickers)) {
                        let lastCryptoObj = cryptoList.find((cryptoObj) => {
                            return(cryptoObj.currency === ticker);
                        })

                        let newCryptoObj = {
                            currency: ticker,
                            symbol: cryptoRate.symbol,
                            buy: cryptoRate.buy,
                            sell: cryptoRate.sell,
                            lastRate: cryptoRate.last,
                       } 

                       if (lastCryptoObj !== undefined) {
                           if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'green';
                                newCryptoObj.htmlArray = String.fromCharCode(8593);
                            } else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'red';
                                newCryptoObj.htmlArray = String.fromCharCode(8595);
                            } else {
                                newCryptoObj.cssClass = 'blue';
                                newCryptoObj.htmlArray = String.fromCharCode(8596);
                            }

                       } else {
                           newCryptoObj.cssClass = 'blue';
                           newCryptoObj.htmlArray = String.fromCharCode(8596);
                       }

                       newCryptoList.push(newCryptoObj);
                    }
                    setCryptoList(newCryptoList);

                    return({
                        cryptoList: newCryptoList
                    })

                

                filterCryptoList();

            });
    }

    const filterCryptoList = (event) => {


        let inputValue = event.target.value;

        let newFilteredCryptoList = cryptoList.filter((cryptoObj) => {
            return(cryptoObj.currency.includes(inputValue))
        });

        setFilterCryptoList(newFilteredCryptoList);
            
        return({
            filteredCryptoList: newFilteredCryptoList
        });
    }



    return(
        <div className="Crypto">
            <input onChange={filterCryptoList}
            type="text" placeholder="Filter"/>
           <CryptoList cryptoList={filteredCryptoList} />
           
        </div>
    );
}

export default CryptoFunctional;