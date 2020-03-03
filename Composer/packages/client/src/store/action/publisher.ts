// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ActionCreator } from '../types';

import { ActionTypes } from './../../constants/index';
import httpClient from './../../utils/httpUtil';

export const getPublishTargetTypes: ActionCreator = async ({ dispatch }) => {
  try {
    const response = await httpClient.get(`/publish/types`);
    dispatch({
      type: ActionTypes.GET_PUBLISH_TYPES_SUCCESS,
      payload: {
        response: response.data,
      },
    });
  } catch (err) {
    // dispatch({ type: ActionTypes.GET_PUBLISH_TYPES_FAILURE, payload: null, error: err });
  }
};

export const publishToTarget: ActionCreator = async ({ dispatch }, projectId, target) => {
  console.log('PUBLISHING TO TARGET!', target);
  try {
    const response = await httpClient.post(`/publish/${projectId}/publish/${target.name}`, target.sensitiveSettings);
    dispatch({
      type: ActionTypes.GET_PUBLISH_STATUS,
      payload: response.data,
    });
  } catch (err) {
    throw new Error(err.response.data.message);
    //   dispatch({
    //     type: ActionTypes.GET_PUBLISH_STATUS_FAILED,
    //     payload: {
    //       error: err,
    //     },
    //   });
  }
};

export const getPublishStatus: ActionCreator = async store => {
  const state = store.getState();
  // const publishTargets = state.publishTargets;
  console.log('get publish status', state.publishTargets);
  // for (let i = 0; i < publishTargets.length; i++) {
  //   const target = publishTargets[i];
  //   if (target.statusCode === 202) {
  //     const response = await httpClient.get('/publish/' + target.type + '/status', {
  //       target: target,
  //       project: null, // should be current project id.
  //     });
  //     console.log('got response to this...', response);
  //   }
  // }
  // dispatch new target list...
  // store.dispatch({});
};
