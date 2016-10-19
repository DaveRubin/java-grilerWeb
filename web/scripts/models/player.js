"use strict"
/**
 * Created by david on 21/09/2016.
 */
var Player = function (name, type,score) {
  this.name = name;
  this.type = type == null ? "human" : type; //black\white
  this.score = score;
  this.isActive = false;
};
