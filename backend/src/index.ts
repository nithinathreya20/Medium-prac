import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate' 
import {sign,decode,verify} from 'hono/jwt'
const app = new Hono<{
  Bindings:{DATABASE_URL:string,
    JWT_TOKEN:string
  }
}>()


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup',async(c)=>{
  const prisma=new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const body=await c.req.json();
try{
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
    const token=sign({id:user.id},c.env.JWT_TOKEN);
    return c.json({jwt:token})
  }
  catch(e){
    c.status(403);
  }
})
app.post('/api/v1/signin',(c)=>{

})

app.post('/api/v1/blog',(c)=>{

})

app.put('/api/v1/blog',(c)=>{

})
app.get('/api/v1/blog/:id',(c)=>{

})
export default app
