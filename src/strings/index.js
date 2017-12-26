import React from 'react';

const space = '&nbsp;';
const line_break = '\n';

export function stringToCode(data) {
  return data.split(`${line_break}`).map(line => {
    return (
      <span key={line[0]}>
        {line}
        <br />
      </span>
    );
  });
}

export const strings = {
  typoTitle:
    `자, 축제를 시작하세요` + line_break + `당신의 삶은 라이브 그 자체입니다.`,
  typoContent:
    `음악을 사랑하는 사람들을 위한` +
    line_break +
    `콘서트 멤버십 애플리케이션입니다.`,
};
