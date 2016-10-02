"use strict"
/**
 * Created by david on 21/09/2016.
 */
var Player = function (name, type) {
  this.name = name;
  this.type = type == null ? "human" : type; //black\white
};
