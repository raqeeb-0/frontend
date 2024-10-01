import { useState, useEffect } from 'react';


export const InputTable = (props) => {
  const { tableContents } = props;

  return (
    <table>
      <thead>
        <tr>
          {
            tableContents.map((content, index) =>
              <th key={index}>{content.label}</th>)
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            tableContents.map((content, index) =>
              <td key={index}>{content.input}</td>)
          }
        </tr>
      </tbody>
    </table>
  );
}
