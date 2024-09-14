import victory from '../../assets/victory.svg'
import Background from '../../assets/login2.png'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';

const Auth = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl ">
        {/* Left Side Content */}
        <div className="flex flex-col items-center justify-center text-center gap-4 p-4">
          <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
          <img src={victory} alt="Victory Emoji" className="h-[100px]" />
          <p className="font-medium">Fill in the details to get started with the best chat app</p>
        </div>
        <div className='flex items-center justify-center w-full'>
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup"
                className="data-[state=active ?]">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="" >Make changes to your account here.</TabsContent>
            <TabsContent value="signup" className="" >Change your password here.</TabsContent>
        </Tabs>

        </div>
        
        {/* Right Side Content
        <div className="hidden xl:flex items-center justify-center bg-cover bg-center rounded-tr-3xl rounded-br-3xl" style={{ backgroundImage: `url(${Background})` }}>
        </div> */}
      </div>
    </div>
  )
}

export default Auth
