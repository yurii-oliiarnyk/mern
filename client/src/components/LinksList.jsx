import React from "react";
import { Link } from "react-router-dom";

const LinksList = (props) => {
  const { links } = props;

  if (links.length === 0) {
    return <p className="centet">Посилань поки немає</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Оригінальне</th>
          <th>Скорочене</th>
          <th>Відкрити</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Відрити</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksList;
