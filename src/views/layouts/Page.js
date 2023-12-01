
import Header from "./Header";
import Footer from "./Footer";
function Page({children, ...props})
{
  return (
    <div className="page-container d-flex flex-column">
      <Header {...props.header}/>

      <div className="content" style={props.content && props.content.style ? props.content.style : {}}>
        <div className="children-container">
          {children}
        </div>
      </div>

      {
        props.footer && <Footer/>
      }
    </div>
  )
}

export default Page
