import React from "react";
import {
  Page,
  Link,
  Navbar,
  Toolbar,
  Tabs,
  Tab,
  Row,
  Col,
} from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import UserService from "../../service/user.service";
import ScheduleSpa from "../../components/schedule/ScheduleSpa";
import ScheduleService from "../../components/schedule/ScheduleService";
import ScheduleSuccess from "../../components/schedule/ScheduleSuccess";
import NotificationIcon from "../../components/NotificationIcon";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      steps: [
        {
          label: "Thời gian",
          component: (
            <ScheduleSpa handleTime={(item) => this.handleTime(item)} />
          ),
          exitValidation: false,
        },
        {
          label: "Dịch vụ",
          component: <ScheduleService />,
        },
        {
          label: "Hoàn tất",
          component: <ScheduleSuccess />,
        },
      ],
      onFinish: false,
      activeStep: 1,
      isLoadingStep1: false,
    };
  }
  componentDidMount() {}

  handleStepChange = (active) => {
    const { activeStep } = this.state;
    if (activeStep < active) return false;
    this.setState({
      activeStep: active,
    });
  };

  nextStep = () => {
    if (this.state.activeStep < this.state.steps.length - 1) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };

  previousStep = () => {
    if (this.state.activeStep > 0) {
      this.setState({ activeStep: this.state.activeStep - 1 });
    }
  };

  handleTime = (item) => {
    this.setState({
      itemStepTime: item,
    });
  };

  nextService = () => {
    const { itemStepTime } = this.state;
    this.setState({
      isLoadingStep1: true,
    });
    setTimeout(() => {
      this.setState({
        isLoadingStep1: false,
      });
      this.nextStep();
    }, 1000);
  };

  controlsStep = () => {
    const { itemStepTime, isLoadingStep1 } = this.state;
    switch (this.state.activeStep) {
      case 0:
        return (
          <div className="schedule-toolbar">
            <button
              type="button"
              className={`btn-submit-order btn-submit-order ${
                itemStepTime && !itemStepTime["time"] ? "btn-no-click" : ""
              } ${!itemStepTime && "btn-no-click"} ${
                isLoadingStep1 && "loading"
              }`}
              onClick={() => this.nextService()}
            >
              <span>Chọn dịch vụ</span>
              <div className="loading-icon">
                <div className="loading-icon__item item-1"></div>
                <div className="loading-icon__item item-2"></div>
                <div className="loading-icon__item item-3"></div>
                <div className="loading-icon__item item-4"></div>
              </div>
            </button>
          </div>
        );
        break;
      case 1:
        return <div>Step2</div>;
      default:
        return <div>Step3</div>;
        break;
    }
  };

  render() {
    const { activeStep, steps } = this.state;
    const stepIndicators =
      steps &&
      steps.map((step, i) => {
        return (
          <div
            key={i}
            className={`page-schedule__step-item ${
              activeStep === i && "active"
            }`}
            onClick={() => this.handleStepChange(i)}
          >
            <div className="number">{i + 1}</div>
            {i !== steps.length && (
              <div className="text">
                <span>{step.label}</span>
              </div>
            )}
          </div>
        );
      });

    return (
      <Page name="schedule">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.$f7router.back()}>
                <i className="las la-angle-left"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Đặt lịch</span>
            </div>
            <div className="page-navbar__noti">
              <NotificationIcon />
            </div>
          </div>
        </Navbar>
        <div className="page-schedule">
          <div className="page-schedule__step">{stepIndicators}</div>
          {steps[activeStep].component}
        </div>
        <Toolbar tabbar position="bottom">
          {this.controlsStep()}
        </Toolbar>
      </Page>
    );
  }
}
