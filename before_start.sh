#!/bin/sh
yum update
yum install -y httpd
service httpd start