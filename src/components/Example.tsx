'use client';

import { Suspense } from 'react';
import { RecoilRoot, selector, useRecoilValue } from 'recoil';

import React from 'react';

export const Data = () => {
  const data = useRecoilValue(dataState);
  return <div>{data}</div>;
};

export const Example = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>loading data from recoil…</div>}>
        <Data />
      </Suspense>
    </RecoilRoot>
  );
};

const dataState = selector<string>({
  key: 'dataState',
  get: async () => {
    console.log('running selector: waiting on promise');
    await new Promise<void>(resolve => {
      setTimeout(() => {
        console.log('resolving');
        resolve();
      }, 2000);
    });
    return '1';
  },
});
