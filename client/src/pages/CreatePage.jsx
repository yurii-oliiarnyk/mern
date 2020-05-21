import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

const CreatePage = (props) => {
  const history = useHistory();

  const [link, setLink] = useState("");

  const auth = useContext(AuthContext);

  const { request } = useHttp();

  const onCreateHandler = (event) => setLink(event.target.value);

  const onKeyPressHandler = async (event) => {
    if (event.key === "Enter") {
      const data = await request(
        "/api/links",
        "POST",
        {
          from: link,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      history.push(`detail/${data.link._id}`);
      try {
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-8" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставте посилання"
            type="text"
            name="link"
            id="link"
            value={link}
            className="app-input"
            onChange={onCreateHandler}
            onKeyPress={onKeyPressHandler}
          />
          <label htmlFor="link">Посилання</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
