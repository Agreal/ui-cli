#!/usr/bin/env node

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

var command = process.argv[2] || 'help';

if (!/^(create|serve)$/.test(command)) {
    console.log('命令错误');
    process.exit(-1);
}

var packageFile = 'package.json';
if (!fs.existsSync(packageFile)) {
  console.log('没有配置文件');
  process.exit(-1);
}

require('./gulpfile');

gulp.start(command);
