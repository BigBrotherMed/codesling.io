import mongoose from 'mongoose';
import bluebird from 'bluebird';

import Sling from '../db/models/sling';
import SlingCommit from '../db/models/slingCommit';
import SlingCommitCode from '../db/models/slingCommitCode';
import log from '../lib/log';
import generateSlingId from '../lib/generateSlingId';

mongoose.Promise = bluebird;

const existsInDatabase = async (slingId) => {
  const sling = await Sling.findOne({ slingId });
  return !!sling;
};

const startingText =
`function hello() {
  console.log('hello!');
}

hello();
`;
 

  
export const slingCreateNew = async (req, res) => {
  try {
    let slingId = generateSlingId();
    while (await existsInDatabase(slingId)) {
      slingId = generateSlingId();
    }
    let code = new SlingCommitCode({ text: startingText });
    await code.save((err, dbData) => { code = dbData; });
    const commit = new SlingCommit({
      sourceCommitId: 'N/A',
      slingCommitCodeId: code.id,
      timeStamp: Date.now(),
      name: 'New Sling',
      userId: 'ToDo',
    });
    let sling = new Sling({ slingId, text: code.text });
    sling.commits.push(commit);
    await sling.save((err, dbData) => { sling = dbData; });
    log('sling successfully created');
    return res.status(200).json({
      success: true,
      slingId: sling.slingId,
      sling: sling
    });
  } catch (e) {
    log('error fetching newSling', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingCommit = async (req, res) => {
  try {
    const { slingId, commitName, codeText } = req.body.commit;
    let sling = await Sling.findOne({ slingId });
    let code = new SlingCommitCode({ codeText });
    await code.save((err, dbData) => { code = dbData; });
    const lastCommit = sling.commits[sling.commits.length - 1];
    const commit = new SlingCommit({
      sourceCommitId: lastCommit.id,
      slingCommitCodeId: code.id,
      timeStamp: Date.now(),
      name: commitName,
      id_User: 'ToDo',
    });
    sling.commits.push(commit);
    await sling.save((err, dbData) => { sling = dbData; });
    log('sling successfully commited');
    return res.status(200).json({
      success: true,
      commit: {
        commitList: sling.commits,
      },
    });
  } catch (e) {
    log('error committing sling', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingRevert = async (req, res) => {
  try {
    const { slingId, commitId } = req.body.revert;
    let sling = await Sling.findOne({ slingId });
    const revertToCommit = sling.commits.findOne({ id: commitId });
    const commit = {
      sourceCommitId: revertToCommit.id,
      slingCommitCodeId: revertToCommit.slingCommitCodeId,
      timeStamp: Date.now(),
      name: `Revert to '${revertToCommit.name}'`,
      userId: 'ToDo',
    };
    const code = SlingCommitCode.findOne({ id: revertToCommit.slingCommitCodeId });
    sling.text = code.text;
    sling.push(commit);
    await sling.save((err, dbData) => { sling = dbData; });
    log('sling successfully reverted');
    return res.status(200).json({
      success: true,
      revert: {
        commitList: sling.commits,
        codeText: code.text,
      },
    });
  } catch (e) {
    log('error reverting sling', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingFetch = async (req, res) => {
  try {
    const sling = await Sling.findOne({ slingId: req.params.slingId });
    log('sling successfully fetched');
    return res.status(200).json({
      success: true,
      sling,
    });
  } catch (e) {
    log('error in slingFetch ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingPost = async (req, res) => {
  try {
    const newSling = new Sling(req.body);
    await newSling.save();
    log('sling successfully created');
    return res.status(200).json({
      success: true,
      newSling,
    });
  } catch (e) {
    log('error in slingPost ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingUpdate = async (req, res) => {
  try {
    const sling = await Sling.findById(req.params.id);
    sling.text = req.body.text;
    await sling.save();
    log('sling successfully updated');
    return res.status(200).json({
      success: true,
      sling,
    });
  } catch (e) {
    log('error in slingUpdate ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingDelete = async (req, res) => {
  try {
    const slingDeleted = await Sling.findByIdAndRemove(req.params.id);
    log('sling successfully deleted');
    return res.status(200).json({
      success: true,
      slingDeleted,
    });
  } catch (e) {
    log('error in slingDelete ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

