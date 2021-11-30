import React from "react";
import { Link, Page } from "framework7-react";
import IconForgot from "../../assets/images/forgot-password.png";
import userService from "../../service/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      input: "",
    };
  }

  handleChangeInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.input === "") {
      toast.error("Vui lòng nhập số điện thoại hoặc Email !", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }
    this.setState({
      loading: true,
    });

    var bodyFormData = new FormData();
    bodyFormData.append("input", this.state.input);
    bodyFormData.append("mode", "email");
    bodyFormData.append("loading", true);
    bodyFormData.append("mess", "");
    bodyFormData.append("error", "");
    bodyFormData.append("currentPhoneNumber", "");

    userService
      .authForget(bodyFormData)
      .then(async ({ data }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (data.error) {
          let TextErr = data.error;
          if (data.error === "EMAIL_WRONG") {
            TextErr = "Email hoặc số điện thoại không hợp lệ.";
          }
          if (data.error === "EMAIL_NOT_REG") {
            TextErr = "Email hoặc số điện thoại chưa đăng ký.";
          }
          toast.error(TextErr, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000,
          });
          this.setState({
            loading: false,
          });
          return;
        }
        this.setState({
          loading: false,
        });
        this.$f7router.navigate("/forgot-change/");
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { loading } = this.state;
    return (
      <Page noNavbar noToolbar name="forgot">
        <div className="page-forgot h-100">
          <div className="to-back">
            <Link onClick={() => this.$f7router.back()}>
              <i className="las la-arrow-left"></i>
            </Link>
          </div>
          <div className="page-forgot__content text-center">
            <h4>Quên mật khẩu</h4>
            <div className="desc">
              Nhập địa chỉ email hoặc số điện thoại và chúng tôi sẽ gửi cho bạn
              một liên kết để đặt lại mật khẩu.
            </div>
            <img className="logo-reg" src={IconForgot} />
            <form onSubmit={this.handleSubmit}>
              <div className="page-login__form-item">
                <input
                  type="text"
                  name="input"
                  autoComplete="off"
                  placeholder="Số điện thoại hoặc Email"
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className="page-login__form-item">
                <button
                  type="submit"
                  className={`btn-login btn-me ${loading ? "loading" : ""}`}
                >
                  <span>Nhận mã</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Page>
    );
  }
}
