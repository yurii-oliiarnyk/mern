import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = (props) => {
  const [link, setLink] = useState(null);
  const { request, loading } = useHttp();

  const { token } = useContext(AuthContext);
  const history = useHistory();
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${linkId}`, "GET", null, {
        Authorization: `Berear ${token}`,
      });

      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  const removeLink = useCallback(async () => {
    try {
      await request(`/api/links/${linkId}`, "DELETE", null, {
        Authorization: `Berear ${token}`,
      });

      history.push(`/links`);
    } catch (e) {}
  }, [token, linkId, request]);

  if (loading) {
    return <Loader />;
  }

  if (!link) {
    return <p>Не вдалось завантажити посилання.</p>;
  }

  return <LinkCard link={link} removeLink={removeLink} />;
};

export default DetailPage;
