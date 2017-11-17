import mongoose from 'mongoose';
import bluebird from 'bluebird';

import Sling from '../db/models/sling';
import SlingCode from '../db/models/slingCode';
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
    // regenerate slingId if it already exists
    while (await existsInDatabase(slingId)) {
      slingId = generateSlingId();
    }
    const slingCode = new SlingCode({ text: startingText });
    let savedSlingCode = null;
    await slingCode.save((err, dbRecord) => {
      savedSlingCode = dbRecord;
    });
    const slingHistory = {
      id_SlingCode: savedSlingCode.id,
      id_SlingHistorySource: 'N/A',
      timeStamp: Date.now(),
      name: 'New Sling',
      id_User: 'ToDo',
    };
    const newSling = new Sling({ slingId, text: savedSlingCode.text });
    newSling.slingHistory.push(slingHistory);
    let savedSling = null;
    console.log('newSling', newSling);
    await newSling.save((err, dbRecord) => {
      console.log('err', err, 'db', dbRecord);
      savedSling = dbRecord;
    });

    
    log('sling successfully created');
    return res.status(200).json({
      success: true,
      // sling: savedSling,
      slingId: savedSling.slingId,
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
    const currentSling = req.body.sling;
    const slingCode = new SlingCode(currentSling.text);
    let savedSlingCode = null;
    await slingCode.save((err, dbRecord) => {
      savedSlingCode = dbRecord;
    });
    const newSlingHistory = {
      id_SlingCode: savedSlingCode.id,
      id_SlingHistorySource: currentSling.id,
      timeStamp: Date.now(),
      name: 'New Sling',
      id_User: 'ToDo',
    };
    const dbSling = await Sling.findOne({ id: currentSling.id });
    dbSling.push(newSlingHistory);
    let savedSling = null;
    await dbSling.save((err, dbRecord) => {
      savedSling = dbRecord;
    });
    log('sling successfully created');
    return res.status(200).json({
      success: true,
      sling: savedSling,
    });
  } catch (e) {
    log('error fetching newSlingId', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingRevert = async (req, res) => {
  try {
    const currentSling = req.body.sling;
    const slingCode = new SlingCode(currentSling.text);
    let savedSlingCode = null;
    await slingCode.save((err, dbRecord) => {
      savedSlingCode = dbRecord;
    });
    const newSlingHistory = {
      id_SlingCode: savedSlingCode.id,
      id_SlingHistorySource: currentSling.id,
      timeStamp: Date.now(),
      name: 'New Sling',
      id_User: 'ToDo',
    };
    const dbSling = await Sling.findOne({ id: currentSling.id });
    dbSling.push(newSlingHistory);
    let savedSling = null;
    await dbSling.save((err, dbRecord) => {
      savedSling = dbRecord;
    });
    log('sling successfully created');
    return res.status(200).json({
      success: true,
      sling: savedSling,
    });
  } catch (e) {
    log('error fetching newSlingId', e);
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

