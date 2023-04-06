const express = require('express');

exports.version = (req, res, next) => {
    return res.status(200).json("hello world");
}