// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
// import doctorModel from './models/doctorModel.js'
// import doctorRouter from './routes/doctorRoute.js'
// import userRouter from './routes/userRoutes.js'

// //app config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()


// //middlewares
// app.use(express.json())
// app.use(cors())

// //api endpoints
// app.use('/api/admin' ,adminRouter);
// // localhost:4000/api/admin/add-doctorModel
// app.use('/api/doctor' , doctorRouter)
// app.use('/api/user' , userRouter)






// app.get('/',(req,res)=> {
//     res.send('API WORKING')
// })

// app.listen(port,()=> console.log("server started",port));





import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'

// App config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// CORS Middleware
app.use(cors({
  origin: 'https://bookmydoc-front.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use(express.json())

// Routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// Health route
app.get('/health', (req, res) => {
  res.send('Healthy')
})

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.listen(port, () => console.log(`Server started on port ${port}`))

