import React from "react";
import { Layout } from "antd";
import { USER_TOKEN } from "../../settings/system";
import { useNavigate } from "react-router-dom";
const { Content, Sider } = Layout;

const UserToken = localStorage.getItem(USER_TOKEN);

function WithAuthenticationTemplate(WrappedComponent) {
  class WithAuthenticationTemplate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        height: window.innerHeight,
      };
    }
    render() {
      return (
        <>
          <Layout style={{ height: this.state.height }}>
            <Content style={{ height: "100%" }}>
              <Layout style={{ height: "100%" }}>
                <Sider
                  width={"60%"}
                  style={{
                    background: "blue",
                    height: this.state.height,
                    backgroundImage: `url(${require("../../assets/img/auth-background.jpg")})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="md:block hidden"
                ></Sider>
                <Content style={{ width: "40%" }}>
                  <WrappedComponent {...this.props} />
                </Content>
              </Layout>
            </Content>
          </Layout>
        </>
      );
    }
  }
  return WithAuthenticationTemplate;
}

export default WithAuthenticationTemplate;
