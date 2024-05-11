import React from "react";

export default function ChatBox() {
  return (
    <div className="chatBox">
      {/* ChatBoxHeader */}
      <div className="chatBox-header">
        <div className="chatBox-info">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div>
            <h3>Tran Phuoc Quan</h3>
            <p>Active 50m ago</p>
          </div>
        </div>
        <div className="chatBox-call">
          <span>
            <img
              src={require("../../assets/img/camera.png")}
              alt="camera-icon"
            />
          </span>
          <span>
            <img src={require("../../assets/img/phone.png")} alt="phone-icon" />
          </span>
          <span>
            <img src={require("../../assets/img/info.png")} alt="info-icon" />
          </span>
        </div>
      </div>
      {/* ChatBox */}
      <div className="chatBox-main my-4">
        <div className="chat chatBox-sender">
          <p className="chat-content">Hello, How are you?</p>
          <p className="chat-status">Sent</p>
        </div>
        <div className="chat chatBox-receiver">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div>
            <p className="chat-content">Hello, How are you?</p>
          </div>
        </div>
        <div className="chat chatBox-sender">
          <p className="chat-content">Hello, How are you?</p>
          <p className="chat-status">Sent</p>
        </div>
        <div className="chat chatBox-receiver">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div>
            <p className="chat-content">Hello, How are you?</p>
          </div>
        </div>
        <div className="chat chatBox-sender">
          <p className="chat-content">Hello, How are you?</p>
          <p className="chat-status">Sent</p>
        </div>
        <div className="chat chatBox-receiver">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div>
            <p className="chat-content">Hello, How are you?</p>
          </div>
        </div>
        <div className="chat chatBox-sender">
          <p className="chat-content">Hello, How are you?</p>
          <p className="chat-status">Sent</p>
        </div>
        <div className="chat chatBox-receiver">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div>
            <p className="chat-content">Hello, How are you?</p>
          </div>
        </div>
        <div className="chat chatBox-sender">
          <p className="chat-content">
            Sơn Án là một chòm sao mờ nằm gần thiên cực nam. Đây là một trong 18
            chòm sao được nhà thiên văn học người Pháp Nicolas-Louis de Lacaille
            đề xuất vào thế kỷ 18 và là một trong 88 chòm sao được Liên đoàn
            Thiên văn Quốc tế công nhận. Tên Latinh của Sơn Án có nghĩa là 'cái
            bàn', mặc dù ban đầu chòm sao này đại diện cho núi Bàn và được gọi
            là Mons Mensae. Chòm sao này bao phủ một khu vực có hình đá đỉnh vòm
            với diện tích 153,5 độ vuông. Nếu không tính chòm sao Nam Cực thì
            đây là chòm sao gần thiên cực nam nhất, vốn chỉ có thể quan sát được
            từ phía nam vĩ tuyến 5°B.
          </p>
          <p className="chat-status">Sent</p>
        </div>
        <div className="chat chatBox-receiver">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div>
            <p className="chat-content">Hello, How are you?</p>
          </div>
        </div>
      </div>
      {/* ChatBoxInput */}
      <div className="chatBox-input">
        <div>
          <img src={require("../../assets/img/img.png")} alt="img" />
          <img src={require("../../assets/img/emoji.png")} alt="emoji" />
          <img src={require("../../assets/img/mic.png")} alt="mic" />
        </div>
        <div>
          <input
            type="text"
            autoComplete="false"
            placeholder="Type messages..."
            name="message"
          />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
