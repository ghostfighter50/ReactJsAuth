import { Request, Response } from 'express'
import { Logger } from '../helpers/logger.helper'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs'

export const FetchFiles = async (req: Request, res: Response) => {
  res.send(req.files)
}

export const UploadFile = async (req: Request, res: Response) => {
  const fileId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  const file = req.files.file as UploadedFile
  file.mv(`../uploads/${fileId}`, (error: Error) => {
    if (error) {
      Logger(null, {
        type: 'Uploads',
        severity: 'low',
        content: `Upload Error : ${error.message}`
      })
      return res.json({
        error: true,
        message: 'Internal Server Error',
        IsAuthenticated: true,
        timestamp: Date.now
      })
    }
    Logger(
      { type: 'UPLOADS', content: `${file.name} uploaded successfully` },
      null
    )
    return res.send({
      status: 'OK',
      message: `${file.name} uploaded successfully`
    })
  })
}

export const FetchFile = async (req: Request, res: Response) => {
  res.download(`../uploads/${req.params.fileId}`, (error: Error) => {
    if (error) {
      Logger(null, {
        type: 'Uploads',
        severity: 'low',
        content: `Fetch File Error : ${error.message}`
      })
      return res.json({
        error: true,
        message: 'Internal Server Error',
        IsAuthenticated: true,
        timestamp: Date.now
      })
    }
  })
}

export const DeleteFile = async (req: Request, res: Response) => {
  fs.unlink(`../uploads/${req.params.fileId}`, (error: Error) => {
    if (error) {
      Logger(null, {
        type: 'Uploads',
        severity: 'low',
        content: `Delete File Error : ${error.message}`
      })
      return res.json({
        error: true,
        message: 'Internal Server Error',
        IsAuthenticated: true,
        timestamp: Date.now
      })
    }
    Logger(
      { type: 'UPLOADS', content: `${req.params.fileId} deleted successfully` },
      null
    )
    return res.send({
      status: 'OK',
      message: `${req.params.fileId} deleted successfully`
    })
  })
}

export const CheckFile = async (
  req: Request,
  res: Response,
  next: Function
) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    Logger(null, {
      type: 'Uploads',
      severity: 'low',
      content: 'No files were uploaded.'
    })
    return res
      .status(400)
      .json({ error: true, message: 'No files were uploaded.' })
  }
  const file = req.files.file as UploadedFile
  if (file.size > 15000000) {
    Logger(null, {
      type: 'Uploads',
      severity: 'low',
      content: 'File is too heavy'
    })
    return res.status(400).json({ error: true, message: 'File is too heavy.' })
  }
  next()
}
