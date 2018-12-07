#//////////////////////////////
#// 
#// bhwaterdb.sql
#//
#//
#// Author:  Brian
#//  
#//
#///////////////////////////////
####################################


CREATE DATABASE BHWATERDB;

USE BHWATERDB;

CREATE TABLE BOREHOLE (
id int NOT NULL auto_increment,
name varchar (30) NOT NULL,
type varchar (30) NOT NULL,
latitude varchar (30) NOT NULL,
longitude varchar (30) NOT NULL,
elevation float (10,2) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE WATERLEVEL (
id int NOT NULL auto_increment,
name varchar (30) NOT NULL,
date datetime NOT NULL default '0000/00/00 00:00:00',
reading float (10,2) NOT NULL,
PRIMARY KEY (id)
);

GRANT ALL ON BHWATERDB.* to bhwater@localhost identified by 'myw2pw';



 
 
