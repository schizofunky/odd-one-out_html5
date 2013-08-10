var levelData = [];

//adds level co-ordinate data
function addLevelData(data){
	levelData.push(data);
}

//retrieves level co-ordinate data
function getLevelData(levelId){
	return levelData[levelId];
}

addLevelData([[190,250],[390,250],[590,250]]);
addLevelData([[190,170],[590,170],[190,370],[590,370]]);
addLevelData([[190,250],[390,250],[590,250],[190,130],[390,130],[590,130],[190,370],[390,370],[590,370]]);
addLevelData([[200,100],[200,210],[200,320],[200,430],[330,100],[330,210],[330,320],[330,430],[460,100],[460,210],[460,320],[460,430],[590,100],[590,210],[590,320],[590,430]]);
