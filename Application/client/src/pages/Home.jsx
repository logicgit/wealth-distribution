// Our Home page will display wealth data

import React from "react";
import axios from "axios";
import WealthComparison from "../images/wealth_comparison.png"

import { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {
    return (
        <div className="home">
            <h1>UK Wealth Inequality</h1>
            <p>Poverty is a huge problem in the UK and around the rest of the world. This has risen in recent years with international events like Covid, Brexit and the war in Ukraine having a large impact on individual wealth. More recently the energy crisis, high levels of inflation and increasing mortgage rates have compounded the financial problems people are facing. </p>
            <p>Wealthy people are often less impacted by such events and in many cases, with the help of professional advisors, can often profit from them. This wealth inequality has continued to grow over the years and shows no signs of slowing. One shocking statistic is that the richest 50 families in the UK hold more wealth than the poorest 33.5M families. That’s half the population of the UK.</p>
            <img src={WealthComparison} alt="Paris" class="WealthImage"></img>
            <p>The aim of this website is to help visualise the huge wealth of the super-rich and also show the impacts of redistributing this wealth. Often when we hear statistics involving large numbers it’s difficult to comprehend them. We know a billion pounds is a lot of money but it’s hard to appreciate its size. These pages will help to contextualise these numbers and the dynamic visualisations I provide can be used to hopefully help redress the balance.</p>
        </div>
    )
}

export default Home

