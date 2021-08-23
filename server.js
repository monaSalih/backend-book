'use strict'

const express=require ('express')
const cors=require('cors')
require('dotenv').config();
const server=express();
server.use (cors());
const PORT=process.env.PORT