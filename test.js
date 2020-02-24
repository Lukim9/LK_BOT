const Discord = require("discord.js");
const RichEmbed = require('discord.js');
var fs = require('fs');
const PREFIX = "ㄹ";

var bot = new Discord.Client();



const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

var chosung_juje = ["게임","과일","네이버웹툰","분식","애니메이션"];

var tier_id = {bronze:"681419605792915481",
silver:"681419606015082517",
gold:"681419606203826176",
platinum:"681419606229123082",
diamond:"681419606178660375",
master:"681419606795354122",
grand_master:"681419606027665414",
challenger:"681419605922938892"};

var chosung = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

var quiz = {};

var mafia = {};
mafia.player = [];
mafia.sendPlayer = [];
mafia.special = ["기자", "건달", "군인", "정치인", "영매", "도굴꾼", "성직자", "테러리스트", "변호사", "은신술사", "마술사"];
mafia.mafiaTeam = ["스파이", "마담", "주술사"];
mafia[1] = ["마피아"];
mafia[2] = ["마피아","의사"];
mafia[3] = ["마피아","경찰","의사"];
mafia[4] = ["마피아","경찰","의사","특직"];
mafia[5] = ["마피아","경찰","의사","특직","특직"];
mafia[6] = ["마피아","맢팀","경찰","의사","특직","특직"];
mafia[7] = ["마피아","맢팀","경찰","의사","특직","특직","특직"];
mafia[8] = ["마피아","마피아","맢팀","경찰","의사","특직","특직","특직"];
mafia[9] = ["마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직"];
mafia[10] = ["마피아","마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직"];
mafia[11] = ["마피아","마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직","특직"];
mafia[12] = ["마피아","마피아","마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직","특직"];
mafia.job = {};
mafia.start = false;
mafia.daylight = 0;
mafia.can_pointer = {};
mafia.pointer = {};
mafia.mafia_pointer = false;
mafia.doctor_pointer = false;
mafia.day = 0;
mafia.mafia_num = 0;
mafia.citizen_num = 0;
mafia.soldier_life = 1;
mafia.one_skill = ["경찰","건달","영매","변호사","스파이","주술사"];
mafia.life = {};
mafia.hook_up = false;
mafia.invisible = false;
mafia.disguise = false;
mafia.complete_disguise = false;
mafia.pointed_mafia = false;
mafia.killed = false;
mafia.threat = false;
mafia.defense = false;
mafia.voting = {};
mafia.votegood = 0;
mafia.votebad = 0;
mafia.voted = {};
mafia.inc = false;
mafia.liver = [];


mafia.job_desc = {
  "마피아":"죽일 사람을 선택하세요.",
  "경찰":"조사할 사람을 선택하세요.",
  "의사":"살릴 사람을 선택하세요.",
  "기자":"취재할 사람을 선택하세요.",
  "건달":"협박할 사람을 선택하세요.",
  "군인":"",
  "정치인":"",
  "영매":"성불할 사람을 선택하세요.",
  "도굴꾼":"",
  "성직자":"부활시킬 사람을 선택하세요.",
  "테러리스트":"산화시킬 사람을 선택하세요.",
  "변호사":"변호할 사람을 선택하세요.",
  "은신술사":"",
  "마술사":"변장할 사람을 선택하세요.",
  "스파이":"조사할 사람을 선택하세요.",
  "마담":"",
  "주술사":"주술을 걸 사람을 선택하세요."
}

function send(ch, msg) {
  var embed = new Discord.RichEmbed().setColor(0x00FFBF).setDescription(msg).setFooter("ⓒ Lukim9, LK BOT");
  ch.channel.send(embed);
  return 0;
}

function dmsend(ch, msg) {
  var embed = new Discord.RichEmbed().setColor(0x00FFBF).setDescription(msg);
  ch.send(embed);
  return 0;
}

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}



function mafia_system(msg) {
  for(var i=0;i<mafia.player.length;i++) {
    dmsend(mafia.sendPlayer[i], "**"+msg+"**");
  }
}

function mafia_reset() {
  mafia.special = ["기자", "건달", "군인", "정치인", "영매", "도굴꾼", "성직자", "테러리스트", "변호사", "은신술사", "마술사"];
  mafia.mafiaTeam = ["스파이", "마담", "주술사"];
  mafia[1] = ["마피아"];
  mafia[2] = ["마피아","의사"];
  mafia[3] = ["마피아","경찰","의사"];
  mafia[4] = ["마피아","경찰","의사","특직"];
  mafia[5] = ["마피아","경찰","의사","특직","특직"];
  mafia[6] = ["마피아","맢팀","경찰","의사","특직","특직"];
  mafia[7] = ["마피아","맢팀","경찰","의사","특직","특직","특직"];
  mafia[8] = ["마피아","마피아","맢팀","경찰","의사","특직","특직","특직"];
  mafia[9] = ["마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직"];
  mafia[10] = ["마피아","마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직"];
  mafia[11] = ["마피아","마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직","특직"];
  mafia[12] = ["마피아","마피아","마피아","마피아","맢팀","경찰","의사","특직","특직","특직","특직","특직"];
  mafia.job = {};
  mafia.start = false;
  mafia.daylight = 0;
  mafia.can_pointer = {};
  mafia.pointer = {};
  mafia.mafia_pointer = false;
  mafia.doctor_pointer = false;
  mafia.day = 0;
  mafia.mafia_num = 0;
  mafia.citizen_num = 0;
  mafia.soldier_life = 1;
  mafia.one_skill = ["경찰","건달","영매","변호사","스파이","주술사"];
  mafia.only_skill = ["성직자","기자"];
  mafia.life = {};
  mafia.hook_up = false;
  mafia.invisible = false;
  mafia.disguise = false;
  mafia.complete_disguise = false;
  mafia.pointed_mafia = false;
  mafia.killed = false;
  mafia.threat = false;
  mafia.defense = false;
  mafia.vote = false;
  mafia.voting = {};
  mafia.votegood = 0;
  mafia.votebad = 0;
  mafia.voted = {};
  mafia.inc = false;
  mafia.liver = mafia.player;
}

function night_ment() {
  mafia.daylight = 1;
  mafia.mafia_pointer = false;
  mafia.doctor_pointer = false;
  mafia.invisible = false;
  mafia.disguise = false;
  mafia.complete_disguise = false;
  mafia.pointed_mafia = false;
  mafia.killed = false;
  mafia.threat = false;
  mafia.defense = false;
  mafia.voting = {};
  mafia.votegood = 0;
  mafia.votebad = 0;
  mafia.inc = false;
  for(var i=0;i<mafia.player.length;i++) {
    mafia.voted[mafia.player[i]] = 1;
    if(mafia.liver.indexOf(mafia.player[i]) != -1) {
      dmsend(mafia.sendPlayer[i], "**밤이 되었습니다.**\n"+mafia.job_desc[mafia.job[mafia.player[i]]]+"\n```"+mafia.liver.join("``` ```")+"``` \n**능력 사용법: $마피아 지목 [닉네임 or 번호]**");
    }
    else {
      dmsend(mafia.sendPlayer[i], "**밤이 되었습니다.**");
    }
  }
}





function day_ment() {
  mafia_system("낮이 밝았습니다.");
  if(mafia.mafia_pointer == false) {
    mafia_system("아무 일도 일어나지 않은 평화로운 날입니다.");
  }
  else if(mafia.doctor_pointer == mafia.mafia_pointer) {
    mafia_system(mafia.doctor_pointer+"님이 의사에 의해 살아났습니다.");
  }
  else if(mafia.job[mafia.mafia_pointer] == "군인" && mafia.soldier_life == 1) {
    mafia.soldier_life = 0;
    mafia_system("군인 "+mafia.mafia_pointer+"님이 마피아의 공격을 버텨냈습니다!");
  }
  else if(mafia.job[mafia.mafia_pointer] == "은신술사") {
    mafia.invisible = true;
    mafia_system("총성은 울렸지만 아무도 죽지 않은 평화로운 날입니다.");
  }
  else if(mafia.job[mafia.mafia_pointer] == "마술사" && mafia.disguise != false) {
    mafia.killed = mafia.disguise;
    mafia.life[mafia.disguise] = 0;
    mafia.liver.remove(mafia.disguise);
    mafia_system(mafia.disguise+"님이 살해당했습니다.");
    if(mafia.job[mafia.disguise] == "마피아" || (mafia.mafiaTeam.indexOf(mafia.job[mafia.disguise]) != -1 && mafia.hook_up)) {
      mafia.mafia_num--;
    }
    else {
      mafia.citizen_num--;
    }
    mafia.complete_disguise = true;
  }
  else if(mafia.job[mafia.mafia_pointer] == "테러리스트" && mafia.pointer[mafia.mafia_pointer] == mafia.pointed_mafia) {
    mafia.life[mafia.pointed_mafia] = 0;
    mafia.liver.remove(mafia.pointed_mafia);
    mafia.mafia_num--;
    mafia.life[mafia.mafia_pointer] = 0;
    mafia.liver.remove(mafia.mafia_pointer);
    mafia.citizen_num--;
    mafia.killed = mafia.mafia_pointer;
    mafia_system("테러리스트 "+mafia.mafia_pointer+"님이 마피아 "+mafia.pointed_mafia+"님과 함께 자폭하였습니다!");
  }
  else {
    mafia.life[mafia.mafia_pointer] = 0;
    mafia.liver.remove(mafia.mafia_pointer);
    mafia.killed = mafia.mafia_pointer;
    mafia_system(mafia.mafia_pointer+"님이 살해당했습니다.");
    if(mafia.job[mafia.mafia_pointer] == "마피아" || (mafia.mafiaTeam.indexOf(mafia.job[mafia.mafia_pointer]) != -1 && mafia.hook_up)) {
      mafia.mafia_num--;
    }
    else {
      mafia.citizen_num--;
    }
  }
  for(var i=0;i<mafia.player.length;i++) {
    if(mafia.can_pointer[mafia.player[i]] == 2) {
      mafia.can_pointer[mafia.player[i]] = 1;
    }
    if(mafia.can_pointer[mafia.player[i]] == 4) {
      mafia.can_pointer[mafia.player[i]] = 1;
    }
    if(mafia.complete_disguise) {
      if(mafia.job[mafia.player[i]] == "마술사") {
        dmsend(mafia.sendPlayer[i], "**"+mafia.pointed_mafia+"님이 살해하였습니다.**");
        mafia.can_pointer[mafia.player[i]] = 3;
      }
    }
    if(mafia.job[mafia.player[i]] == "성직자") {
      if(mafia.pointer[mafia.player[i]] != undefined) {
        mafia.can_pointer[mafia.player[i]] = 3;
        mafia.life[mafia.pointer[mafia.player[i]]] = 1;
        mafia.liver.push(mafia.disguise);
        mafia_system(mafia.pointer[mafia.player[i]]+"님이 부활하였습니다.");
      }
    }
    if(mafia.job[mafia.player[i]] == "도굴꾼" && mafia.day == 1 && mafia.mafia_pointer != false) {
      mafia.job[mafia.player[i]] = mafia.job[mafia.killed];
      dmsend(mafia.sendPlayer[i], "**"+mafia.job[mafia.killed]+" 직업을 획득하였습니다.**");
    }
    if(mafia.job[mafia.player[i]] == "기자" && mafia.pointer[mafia.player[i]] != undefined) {
      mafia.can_pointer[mafia.player[i]] = 3;
      mafia_system("특보입니다! "+mafia.pointer[mafia.player[i]]+"님이 "+mafia.job[mafia.pointer[mafia.player[i]]]+"(이)라는 사실입니다!");
    }
  }
  mafia.daylight = 0;
}





async function mafia_start() {
  mafia.start = true;
  night_ment();
  while(true) {
    mafia.day++;
    await delay(20000);
    day_ment();
    if(mafia.mafia_num == 0) {
      var result = [];
      for(var i=0;i<mafia.player.length;i++) {
        result.push(mafia.player[i]+" : "+mafia.job[mafia.player[i]]);
      }
      mafia_system("시민팀이 승리했습니다!\n직업\n"+result.join("\n"));
      mafia_reset();
      break;
    }
    else if(mafia.mafia_num >= mafia.citizen_num) {
      var result = [];
      for(var i=0;i<mafia.player.length;i++) {
        result.push(mafia.player[i]+" : "+mafia.job[mafia.player[i]]);
      }
      mafia_system("마피아팀이 승리했습니다!\n직업\n"+result.join("\n"));
      mafia_reset();
      break;
    }
    await delay(60000);
    for(var i=0;i<mafia.liver.length;i++) {
      mafia.voting[mafia.liver[i]] = 0;
    }
    mafia_system("투표시간이 되었습니다.\n$마피아 투표 [닉네임 or 번호] 으로 투표해주세요.\n```"+mafia.liver.join("``` ```")+"```");
    mafia.vote = 1;
    await delay(25000);
    mafia.vote = false;
    var maximum = -1;
    var max_user = [];
    for(var i=0;i<mafia.liver.length;i++) {
      mafia.voted[mafia.liver[i]] = 1;
      if(mafia.voting[mafia.liver[i]] > maximum) {
        maximum = mafia.voting[mafia.liver[i]];
        max_user = [];
        max_user.push(mafia.liver[i]);
      }
      else if(mafia.voting[mafia.liver[i]] == maximum) {
        max_user.push(mafia.liver[i]);
      }
    }
    if(max_user.length == 1) {
      mafia_system(max_user[0]+"님에 대한 찬반 투표\n( $마피아 찬성 / $마피아 반대 )");
      mafia.vote = 2;
      await delay(20000);
      mafia.vote = false;
      if(mafia.votebad >= mafia.votegood) {
        night_ment();
      }
      else {
        if(mafia.job[max_user[0]] == "정치인") {
          mafia_system("정치인은 투표로 처형당하지 않습니다.");
        }
        else {
          mafia_system(max_user[0]+"님이 투표로 처형당했습니다.");
          mafia.life[max_user[0]] = 0;
          mafia.liver.remove(max_user[0]);
          if(mafia.job[max_user[0]] == "마피아" || (mafia.mafiaTeam.indexOf(mafia.job[max_user[0]]) != -1 && mafia.hook_up)) {
            mafia.mafia_num--;
          }
          else {
            mafia.citizen_num--;
          }
          if(mafia.mafia_num == 0) {
            var result = [];
            for(var i=0;i<mafia.player.length;i++) {
              result.push(mafia.player[i]+" : "+mafia.job[mafia.player[i]]);
            }
            mafia_system("시민팀이 승리했습니다!\n직업\n"+result.join("\n"));
            mafia_reset();
            break;
          }
          else if(mafia.mafia_num >= mafia.citizen_num) {
            var result = [];
            for(var i=0;i<mafia.player.length;i++) {
              result.push(mafia.player[i]+" : "+mafia.job[mafia.player[i]]);
            }
            mafia_system("마피아팀이 승리했습니다!\n직업\n"+result.join("\n"));
            mafia_reset();
            break;
          }
        }
        night_ment();
      }
    }
    else {
      night_ment();
    }
  }
}

function read(path) {
  try {
    var data = fs.readFileSync(path, 'utf8');
  } catch(e) {
    var data = 'null';
  }
  return data;
}

function save(path, data) {
  fs.writeFileSync(path, data, 'utf8');
  return data;
}

function dirReset(folder) {
  var players = fs.readdirSync(folder);
  for(var i=0;i<players.length;i++) {
    fs.unlinkSync(folder+"/"+players[i]);
  }
}

function plus(path, num) {
  if(read(path) == 'null') {
    save(path, num);
  }
  else {
    save(path, Number(read(path)) + Number(num));
  }
}

function reset(path, data) {
  if(read(path) == 'null') {
    save(path, data);
  }
}

function cho_hangul(str) {
  cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  result = "";
  for(i=0;i<str.length;i++) {
    code = str.charCodeAt(i)-44032;
    if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
    else result += str.charAt(i);
  }
  return result;
}

function getRank() {
  var pls = fs.readdirSync("경험치/");
  var result = [];
  var rank = [];
  var ranks = {};
  var rank2 = [];
  var already = [];
  for(var i=0;i<pls.length;i++) {
    var sum_exp = Number(read("경험치/"+pls[i]))
    for(var j=1;j<Number(read("레벨/"+pls[i]));j++) {
      sum_exp += j * 10;
    }
    result.push(sum_exp);
    rank.push(sum_exp);
  }
  result = result.sort(mysort).reverse();
  for(var i=0;i<result.length;i++) {
    for(var j=0;j<result.length;j++) {
      if(rank[j] == result[i]) {
        if(already.indexOf(pls[j]) != -1) continue;
        already.push(pls[j]);
        ranks[pls[j].split(".txt")[0]] = i+1;
        break;
      }
    }
  }
  return ranks;
}

function getRanking() {
  var pls = fs.readdirSync("경험치/");
  var result = [];
  var rank = [];
  var ranking = [];
  var already = [];
  for(var i=0;i<pls.length;i++) {
    var sum_exp = Number(read("경험치/"+pls[i]))
    for(var j=1;j<Number(read("레벨/"+pls[i]));j++) {
      sum_exp += j * 10;
    }
    result.push(sum_exp);
    rank.push(sum_exp);
  }
  result = result.sort(mysort).reverse();
  for(var i=0;i<result.length;i++) {
    for(var j=0;j<result.length;j++) {
      if(rank[j] == result[i]) {
        if(already.indexOf(pls[j]) != -1) continue;
        already.push(pls[j]);
        ranking.push(pls[j].split(".txt")[0]);
        break;
      }
    }
  }
  return ranking;
}

function getRankForPrint() {
  var pls = fs.readdirSync("경험치/");
  var result = [];
  var rank = [];
  var ranks = {};
  var rank2 = [];
  var already = [];
  for(var i=0;i<pls.length;i++) {
    var sum_exp = Number(read("경험치/"+pls[i]))
    for(var j=1;j<Number(read("레벨/"+pls[i]));j++) {
      sum_exp += j * 10;
    }
    result.push(sum_exp);
    rank.push(sum_exp);
  }
  result = result.sort(mysort).reverse();
  for(var i=0;i<result.length;i++) {
    for(var j=0;j<result.length;j++) {
      if(rank[j] == result[i]) {
        if(already.indexOf(pls[j]) != -1) continue;
        already.push(pls[j]);
        rank2.push((i+1)+"위: "+pls[j].split(".txt")[0]+" (EXP: "+result[i]+")");
        break;
      }
    }
  }
  return rank2;
}

function setTier() {
  var ranking = getRanking();
  var plen = ranking.length;
  for(var i=0;i<ranking.length;i++) {
    if (i == 0) {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.challenger)+" 𝑪𝒉𝒂𝒍𝒍𝒆𝒏𝒈𝒆𝒓");
    }
    else if(i < Math.floor(plen * 0.1)) {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.grand_master)+" 𝑮𝒓𝒂𝒏𝒅 𝒎𝒂𝒔𝒕𝒆𝒓");
    }
    else if(i < Math.floor(plen * 0.2)) {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.master)+" 𝑴𝒂𝒔𝒕𝒆𝒓");
    }
    else if(i < Math.floor(plen * 0.3)) {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.diamond)+" 𝑫𝒊𝒂𝒎𝒐𝒏𝒅");
    }
    else if (i < Math.floor(plen * 0.45)) {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.platinum)+" 𝑷𝒍𝒂𝒕𝒊𝒏𝒖𝒎");
    }
    else if(i < Math.floor(plen * 0.6)) {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.gold)+" 𝑮𝒐𝒍𝒅");
    }
    else if(i < Math.floor(plen * 0.8)) {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.silver)+" 𝑺𝒊𝒍𝒗𝒆𝒓");
    }
    else {
      save("티어/"+ranking[i]+".txt", emoji(tier_id.bronze)+" 𝑩𝒓𝒐𝒏𝒛𝒆");
    }
  }
}

function emoji(id) {
  return bot.emojis.get(id).toString();
}

Array.prototype.remove = function(cha) {
  var idx = this.indexOf(cha);
  if(cha == -1) {
    return -1;
  }
  this.splice(idx, 1);
};

Array.prototype.removeByIdx = function(idx) {
  this.splice(idx, 1);
};

function mysort(a,b) {
  return parseInt(a) - parseInt(b);
}

bot.on("ready", function(){
    console.log("준비되었습니다.");
    bot.user.setActivity('LK봇 기능을 테스트', {type: "PLAYING"});
})

bot.on('guildMemberAdd', function(member) {
  var channel = member.guild.channels.find(ch => ch.name === '★기본잡담방★');
  if (!channel) return;
  channel.send("> **어서오세요, "+member+"님!**");
  channel = member.guild.channels.find(ch => ch.name === '자기소개방📖');
  if (!channel) return;
  channel.send("> **"+member+"님! 자기소개는 여기서 해주세요 :)**");
});

bot.on('guildMemberRemove', function(member) {
  let guild = member.guild;
  let memberTag = member.user.username;
  if(guild.systemChannel) {
	   guild.systemChannel.send("> **" + memberTag + "님이 나가셨습니다. :(**");
  }
});

bot.on("message", async message => {
    if (message.author.equals(bot.user)) return;

    var sender = message.author.username;
    if(message.channel.name != null) {
      sender = message.guild.member(message.author).nickname;
      if(sender == null) {
        sender = message.author.username;
      }
    }

    if(sender.startsWith("[ 봇 ] ")) return;


    if(message.channel.name == undefined)  {
      if(mafia.sendPlayer.indexOf(message.author) != -1 && !message.content.startsWith(PREFIX) && mafia.daylight == 0 && mafia.life[message.author.username] != 0) {
        if(!(mafia.job[message.author.username] == "은신술사" && mafia.invisible)) {
          var sender = message.author.username;
          for(var i=0;i<mafia.sendPlayer.length;i++) {
            if(mafia.sendPlayer[i] == message.author) {
              continue;
            }
          dmsend(mafia.sendPlayer[i], "**<"+sender+">**\n"+message);
          }
        }
      }
      else if(mafia.sendPlayer.indexOf(message.author) != -1 && !message.content.startsWith(PREFIX) && mafia.life[message.author.username] == 0) {
        var sender = message.author.username;
        for(var i=0;i<mafia.sendPlayer.length;i++) {
          if(mafia.job[mafia.player[i]] == "영매") {
            dmsend(mafia.sendPlayer[i], "**<"+sender+">**\n"+message);
          }
        }
      }
      else if(mafia.sendPlayer.indexOf(message.author) != -1 && !message.content.startsWith(PREFIX) && mafia.daylight == 1 && (mafia.job[message.author.username] == "마피아" || (mafia.mafiaTeam.indexOf(mafia.job[message.author.username]) != -1 && mafia.hook_up))) {
        var sender = message.author.username;
        for(var i=0;i<mafia.sendPlayer.length;i++) {
          if((mafia.job[mafia.player[i]] == "마피아" || (mafia.mafiaTeam.indexOf(mafia.job[mafia.player[i]]) != -1 && mafia.hook_up))) {
            dmsend(mafia.sendPlayer[i], "**<"+sender+">**\n"+message);
          }
        }
      }
    }

    if(message.author.bot) return;

    if(quiz.start) {
      if(cho_hangul(message.content) == cho_hangul(quiz.answer)) {
        var sender = message.author.username;
        reset("레벨/"+sender+".txt", 1);
        reset("티어/"+sender+".txt", emoji(tier_id.bronze)+" 𝑩𝒓𝒐𝒏𝒛𝒆");
        if(message == quiz.answer) {
          plus("경험치/"+sender+".txt", quiz.answer.length*2);
          if(Number(read("경험치/"+sender+".txt")) >= (Number(read("레벨/"+sender+".txt")) * 10)) {
            plus("경험치/"+sender+".txt", 0-(Number(read("레벨/"+sender+".txt")) * 10))
            plus("레벨/"+sender+".txt", 1);
            send(message, "**초성퀴즈 Season4**\n\n"+read("티어/"+sender+".txt")+" ``"+sender+"``**님 레벨 업!**\n``Lv. "+(Number(read("레벨/"+sender+".txt"))-1)+" ▶ Lv. "+read("레벨/"+sender+".txt")+"``");
          }
          plus("포인트/"+sender+".txt", quiz.answer.length);
          var players = fs.readdirSync("최대일치율");
          var result = [];
          for(var i=0;i<players.length;i++) {
            if(sender+".txt" == players[i]) continue;
            if(read("최대일치율/"+players[i]) == "0.0") continue;
            plus("경험치/"+players[i], ((quiz.answer.length*2) * (Number(read("최대일치율/"+players[i])) * 0.01)).toFixed(0));
            if(Number(read("경험치/"+players[i])) >= (Number(read("레벨/"+players[i])) * 10)) {
              plus("경험치/"+players[i], 0-(Number(read("레벨/"+players[i])) * 10))
              plus("레벨/"+players[i], 1);
              send(message, "**초성퀴즈 Season4**\n\n"+read("티어/"+players[i])+" ``"+players[i].split(".txt")[0]+"``**님 레벨 업!**\n``Lv. "+(Number(read("레벨/"+players[i]))-1)+" ▶ Lv. "+read("레벨/"+players[i])+"``");
            }
            result.push("> "+read("티어/"+players[i])+" ``"+players[i].split(".txt")[0]+"``**님 EXP +"+((quiz.answer.length*2) * (Number(read("최대일치율/"+players[i])) * 0.01)).toFixed(0)+"**");
          }
          dirReset("최대일치율");
          setTier();
          send(message, "**초성퀴즈 Season4**\n\n"+read("티어/"+sender+".txt")+" ``"+sender+"``**님이 정답을 맞추셨습니다!**\n\n> **포인트 +"+quiz.answer.length+"**\n> **EXP +"+(quiz.answer.length*2)+"**\n> **현재 EXP: "+read("경험치/"+sender+".txt")+"/"+(Number(read("레벨/"+sender+".txt")) * 10)+"**\n\n"+result.join("\n"));
          quiz = {};
        }
        else {
          var percent = 0;
          var ans = quiz.answer.split("");
          var que = message.content.split("");
          for(var i=0;i<quiz.answer.length;i++) {
            if(ans[i] == que[i]) {
              percent++;
            }
          }
          percent = ((percent / quiz.answer.length) * 100).toFixed(1);
          if(read("최대일치율/"+sender+".txt") == 'null') {
            save("최대일치율/"+sender+".txt", percent);
          }
          else {
            if(Number(read("최대일치율/"+sender+".txt")) < percent) {
              save("최대일치율/"+sender+".txt", percent);
            }
          }
          var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***정답이 아닙니다!***\n> **일치율 :** ``"+percent+"%``\n> **최고 일치율:** ``"+read("최대일치율/"+sender+".txt")+"%``").setFooter("ⓒ Lukim9, LK BOT");
          message.channel.send(embed);
        }
      }
    }


    if (!message.content.startsWith(PREFIX)) return;
    var msg = message.content.substring(PREFIX.length);
    var sender = message.author.username;
    if(message.channel.name != null) {
      sender = message.guild.member(message.author).nickname;
      if(sender == null) {
        sender = message.author.username;
      }
    }

    switch (msg.toLowerCase()) {
        case "도움말":
            var embed = new Discord.RichEmbed()
            .addField("**ㄹ인사**","LK봇이 인사를 해줍니다.")
            .addField("**ㄹsay [할 말]**","LK봇이 말을 전달합니다.")
            .addField("**ㄹ픽크루**","LK봇이 픽크루 캐릭터들로 반응해줍니다.")
            .addField("**ㄹ마피아 [참가|퇴장|시작|지목|투표|찬성|반대]**","LK봇 개인 DM으로 마피아를 즐길 수 있습니다.")
            .addField("**ㄹ초성퀴즈**","초성퀴즈를 할 수 있습니다.")
            .addField("**ㄹ힌트**","1.5포인트를 사용하여 초성퀴즈 힌트를 볼 수 있습니다.")
            .addField("**ㄹ초퀴정보**","내 초성퀴즈 정보를 볼 수 있습니다.")
            .addField("**ㄹ순위**","초성퀴즈 순위를 볼 수 있습니다.")
            .addField("**ㄹ주제 변경 [주제]**","초성퀴즈 중에 3포인트를 사용하여 주제를 원하는대로 변경할 수 있습니다.")
            .addField("**ㄹ스킵**","5포인트를 사용하여 문제를 스킵하고 50%의 경험치를 얻습니다.")
            .setColor(0x00FFBF)
            .setFooter("ⓒ Lukim9, LK BOT");
            message.channel.sendEmbed(embed);
            break;

        case "인사":
            var embed = new Discord.RichEmbed().setColor(0x00FFBF).setDescription(sender+"님 안녕하세요!").setFooter("ⓒ Lukim9, LK BOT");
            message.channel.send(embed);
            break;
    }

    if (msg.startsWith("say ")) {
      send(message, "**<"+sender+"> "+msg.substring(4)+"**");
      message.delete();
    }

    if(msg.toLowerCase() == "픽크루") {
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_yeonwoo'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_tpos'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_sinbub'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_peng'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_maxim'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_lukim9'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_luckd'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_kyobok'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_chyagi'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_apcal'));
      await message.react(message.guild.emojis.find(emoji => emoji.name === 'picrew_akma'));
    }

    if(msg.toLowerCase() == "실험") {
      message.channel.send(emoji("681419605792915481"));
    }

    if(msg.toLowerCase() == "테스트") {
      var timer = 80;
      var m = Math.floor(timer / 60);
      var s = timer % 60;
      var sent_message = await message.channel.send("테스트 타이머: "+pad(m,2)+":"+pad(s,2));
      var pined = await sent_message.pin();
      await message.channel.bulkDelete(1);
      while(timer > 0) {
        await delay(5000);
        timer-=5;
        if(timer <= 0)
          timer = 0;
        m = Math.floor(timer / 60);
        s = timer % 60;
        sent_message.edit("테스트 타이머: "+pad(m,2)+":"+pad(s,2));
      }
      sent_message.edit("테스트 타이머가 끝났습니다 :)");
      pined.unpin();
    }


    if(msg.toLowerCase() == "초성퀴즈") {
      if(quiz.start) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4 (Test)**\n\n***이미 문제가 출제되었습니다.***\n\n> **주제: **`"+quiz.subject+"`\n> **문제: **`"+quiz.quest+"`").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else {
        setTier();
        dirReset("최대일치율");
        var juje = chosung_juje[Math.floor(Math.random()*chosung_juje.length)];
        var data = fs.readFileSync(juje+".txt", 'utf8').split("\n");
        quiz.idx = Math.floor(Math.random()*data.length);
        quiz.quest = cho_hangul(data[quiz.idx].trim());
        quiz.subject = juje;
        quiz.answer = data[quiz.idx].trim();
        quiz.start = true;
        send(message, "  **초성퀴즈 Season4**\n\n> **주제: **`"+quiz.subject+"`\n> **문제: **`"+quiz.quest+"`");
      }
    }

    if(msg.toLowerCase() == "힌트" && quiz.start) {
      sender = message.author.username;
      reset("레벨/"+sender+".txt", 1);
      if(quiz.quest == quiz.answer) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***더 이상 힌트를 사용할 수 없습니다.***").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else if(read("레벨/"+sender+".txt") == "1") {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***2레벨 이상만 사용할 수 있습니다.***").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else if(Number(read("포인트/"+sender+".txt")) < 1.5) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***포인트가 부족합니다.*** ``(힌트 가격: 1.5포인트)``").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else {
        plus("포인트/"+sender+".txt", -1.5);
        var random_e = Math.floor(Math.random()*quiz.answer.length);
        var que = quiz.quest.split("");
        var ans = quiz.answer.split("");
        while(true) {
          if(chosung.indexOf(que[random_e]) != -1) {
            break;
          }
          else {
            random_e = Math.floor(Math.random()*quiz.answer.length);
          }
        }
        que[random_e] = ans[random_e];
        quiz.quest = que.join("");
        if(quiz.quest == quiz.answer) {
          var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***정답은*** ``"+quiz.answer+"``***입니다. 게임을 종료합니다.***").setFooter("ⓒ Lukim9, LK BOT");
          message.channel.send(embed);
          quiz = {};
          dirReset("최대일치율");
        }
        else {
          var embed = new Discord.RichEmbed().setColor(0xFFF000).setDescription("**초성퀴즈 Season4**\n\n> **포인트 -1.5**\n> **힌트: **`"+quiz.quest+"`").setFooter("ⓒ Lukim9, LK BOT");
          message.channel.send(embed);
        }
      }
    }

    if(msg.toLowerCase() == "초퀴정보") {
      sender = message.author.username;
      reset("레벨/"+sender+".txt", 1);
      reset("경험치/"+sender+".txt", 0);
      reset("포인트/"+sender+".txt", 0);
      var ranking = getRank();
      var sum_exp = Number(read("경험치/"+sender+".txt"))
      for(var i=1;i<Number(read("레벨/"+sender+".txt"));i++) {
        sum_exp += i * 10;
      }
      send(message, "**초성퀴즈 Season4 (Test)**\n\n> **Lv. "+read("레벨/"+sender+".txt")+"**\n> **EXP: "+read("경험치/"+sender+".txt")+"/"+(Number(read("레벨/"+sender+".txt")) * 10)+"**\n> **총 EXP: "+sum_exp+"**\n> **순위: "+ranking[sender]+"위**\n> **티어: **"+read("티어/"+sender+".txt")+"\n> **포인트: "+read("포인트/"+sender+".txt")+"**");
    }

    if(msg.toLowerCase() == "순위") {
      var ranking = getRankForPrint();
      send(message, "**초성퀴즈 Season4 (Test)**\n\n```"+ranking.join("\n")+"```");
    }

    if(msg.toLowerCase().startsWith("주제 변경 ") && quiz.start) {
      sender = message.author.username;
      var edited_juje = msg.toLowerCase().substring(6);
      reset("레벨/"+sender+".txt", 1);
      if(Number(read("레벨/"+sender+".txt")) < 5) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***5레벨 이상만 사용할 수 있습니다.***").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else if(Number(read("포인트/"+sender+".txt")) < 3) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***포인트가 부족합니다.*** ``(주제 변경 가격: 3포인트)``").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else if(chosung_juje.indexOf(edited_juje) == -1) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***해당 주제는 존재하지 않습니다.***").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else {
        plus("포인트/"+sender+".txt", -3);
        setTier();
        dirReset("최대일치율");
        var juje = edited_juje;
        var data = fs.readFileSync(juje+".txt", 'utf8').split("\n");
        quiz.idx = Math.floor(Math.random()*data.length);
        quiz.quest = cho_hangul(data[quiz.idx].trim());
        quiz.subject = juje;
        quiz.answer = data[quiz.idx].trim();
        quiz.start = true;
        send(message, "  **초성퀴즈 Season4**\n\n"+read("티어/"+sender+".txt")+" ``"+sender+"``**님이 주제를 변경하셨습니다!**\n> **포인트 -3**\n> **주제: **`"+quiz.subject+"`\n> **문제: **`"+quiz.quest+"`");
      }
    }

    if(msg.toLowerCase() == "스킵" && quiz.start) {
      sender = message.author.username;
      reset("레벨/"+sender+".txt", 1);
      if(Number(read("레벨/"+sender+".txt")) < 3) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***3레벨 이상만 사용할 수 있습니다.***").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else if(Number(read("포인트/"+sender+".txt")) < 3) {
        var embed = new Discord.RichEmbed().setColor(0xFF0000).setDescription("**초성퀴즈 Season4**\n\n***포인트가 부족합니다.*** ``(스킵 가격: 5포인트)``").setFooter("ⓒ Lukim9, LK BOT");
        message.channel.send(embed);
      }
      else {
        plus("포인트/"+sender+".txt", -5);
        plus("경험치/"+sender+".txt", quiz.answer.length);
        if(Number(read("경험치/"+sender+".txt")) >= (Number(read("레벨/"+sender+".txt")) * 10)) {
          plus("경험치/"+sender+".txt", 0-(Number(read("레벨/"+sender+".txt")) * 10))
          plus("레벨/"+sender+".txt", 1);
          send(message, "**초성퀴즈 Season4**\n\n"+read("티어/"+sender+".txt")+" ``"+sender+"``**님 레벨 업!**\n``Lv. "+(Number(read("레벨/"+sender+".txt"))-1)+" ▶ Lv. "+read("레벨/"+sender+".txt")+"``");
        }
        var players = fs.readdirSync("최대일치율");
        var result = [];
        for(var i=0;i<players.length;i++) {
          if(sender+".txt" == players[i]) continue;
          if(read("최대일치율/"+players[i]) == "0.0") continue;
          plus("경험치/"+players[i], ((quiz.answer.length) * (Number(read("최대일치율/"+players[i])) * 0.01)).toFixed(0));
          if(Number(read("경험치/"+players[i])) >= (Number(read("레벨/"+players[i])) * 10)) {
            plus("경험치/"+players[i], 0-(Number(read("레벨/"+players[i])) * 10))
            plus("레벨/"+players[i], 1);
            send(message, "**초성퀴즈 Season4**\n\n"+read("티어/"+players[i])+" ``"+players[i].split(".txt")[0]+"``**님 레벨 업!**\n``Lv. "+(Number(read("레벨/"+players[i]))-1)+" ▶ Lv. "+read("레벨/"+players[i])+"``");
          }
          result.push("> "+read("티어/"+players[i])+" ``"+players[i].split(".txt")[0]+"``**님 EXP +"+((quiz.answer.length) * (Number(read("최대일치율/"+players[i])) * 0.01)).toFixed(0)+"**");
        }
        dirReset("최대일치율");
        setTier();
        send(message, "**초성퀴즈 Season4**\n\n"+read("티어/"+sender+".txt")+" ``"+sender+"``**님이 문제를 스킵하셨습니다!**\n\n> **포인트 -5**\n> **EXP +"+(quiz.answer.length)+"**\n> **현재 EXP: "+read("경험치/"+sender+".txt")+"/"+(Number(read("레벨/"+sender+".txt")) * 10)+"**\n\n"+result.join("\n"));
        quiz = {};
      }
    }



    if(message.channel.name == undefined)  {


      if(msg.toLowerCase().split(" ")[0] == "마피아" || msg.toLowerCase().split(" ")[0] == "맢" || msg.toLowerCase().split(" ")[0] == "ㅁ") {
        var args = msg.toLowerCase().substring((msg.toLowerCase().split(" ")[0].length)+1);
        if(isNaN(args.substring(3)) == false) {
          if(Number(args.substring(3)) > 0 && Number(args.substring(3)) < 13)
          args = msg.toLowerCase().substring((msg.toLowerCase().split(" ")[0].length)+1).split(" ")[0] + " " + mafia.liver[Number(args.substring(3)) - 1];
        }

        if(args.toLowerCase() == "참가") {
          if(mafia.start) {
            dmsend(message.author, "**게임이 이미 시작되었습니다.**");
          }
          else if(mafia.player.indexOf(sender) != -1) {
            dmsend(message.author, "**이미 참가하였습니다.**\n> 참가자 리스트("+mafia.player.length+"/12):\n```"+mafia.player.join("``` ```")+"```");
          }
          else if(mafia.player.length >= 12) {
            dmsend(message.author, "**게임이 꽉 찼습니다.**\n> 참가자 리스트("+mafia.player.length+"/12):\n```"+mafia.player.join("``` ```")+"```");
          }
          else {
            mafia.player.push(sender);
            mafia.sendPlayer.push(message.author);
            mafia.liver.push(sender);
            dmsend(message.author, "**마피아게임에 참가하셨습니다.**\n> 참가자 리스트("+mafia.player.length+"/12):\n```"+mafia.player.join("``` ```")+"```");
            for(var i=0;i<mafia.sendPlayer.length;i++) {
              if(mafia.sendPlayer[i] == message.author) {
                continue;
              }
            dmsend(mafia.sendPlayer[i], "**"+sender+"님이 마피아게임에 참가하셨습니다.**\n> 참가자 리스트("+mafia.player.length+"/12):\n```"+mafia.player.join("``` ```")+"```");
            }
          }
        }

        if(args.toLowerCase() == "퇴장") {
          if(mafia.start) {
            dmsend(message.author, "**게임이 이미 시작되었습니다.**");
          }
          else if(mafia.player.indexOf(sender) == -1) {
            dmsend(message.author, "**게임에 참가하지 않으셨습니다.**");
          }
          else {
            mafia.player.remove(sender);
            mafia.sendPlayer.remove(message.author);
            mafia.liver.remove(sender);
            if(mafia.player.length == 0) {
              dmsend(message.author, "**모든 사람이 마피아게임에서 퇴장하였습니다.**");
            }
            else {
              dmsend(message.author, "**마피아게임에서 퇴장하셨습니다.**\n> 참가자 리스트("+mafia.player.length+"/12):\n```"+mafia.player.join("``` ```")+"```");
              for(var i=0;i<mafia.sendPlayer.length;i++) {
                if(mafia.sendPlayer[i] == message.author) {
                  continue;
                }
                dmsend(mafia.sendPlayer[i], "**"+sender+"님이 마피아게임에서 퇴장하셨습니다.**\n> 참가자 리스트("+mafia.player.length+"/12):\n```"+mafia.player.join("``` ```")+"```");
              }
            }
          }
        }

        if(args.toLowerCase() == "시작") {
          if(mafia.player.indexOf(sender) != 0) {
            dmsend(message.author, "**방장("+mafia.player[0]+"님)이 게임을 시작해야 합니다.**");
          }
          else if(mafia.player.length < 4) {
            dmsend(message.author, "**게임을 시작하려면 최소 4명 이상이어야 합니다.**");
          }
          else {
            mafia_system("게임이 시작되었습니다!");
            for(var i=0;i<mafia.player.length;i++) {
              var element = Math.floor(Math.random()*mafia[mafia.player.length].length);
              if(mafia[mafia.player.length][element] == "특직") {
                var element2 = Math.floor(Math.random()*mafia.special.length);
                mafia.job[mafia.player[i]] = mafia.special[element2];
                mafia.special.removeByIdx(element2);
              }
              else if(mafia[mafia.player.length][element] == "맢팀") {
                var element2 = Math.floor(Math.random()*mafia.mafiaTeam.length);
                mafia.job[mafia.player[i]] = mafia.mafiaTeam[element2];
              }
              else {
                mafia.job[mafia.player[i]] = mafia[mafia.player.length][element];
              }
              mafia[mafia.player.length].removeByIdx(element);
              dmsend(mafia.sendPlayer[i], "**"+mafia.player[i]+"님의 직업은 "+mafia.job[mafia.player[i]]+"입니다.**");
              if(mafia.job_desc[mafia.job[mafia.player[i]]] == "") {
                mafia.can_pointer[mafia.player[i]] = 0;
              }
              else {
                mafia.can_pointer[mafia.player[i]] = 1;
              }
              if(mafia.job[mafia.player[i]] == "마피아") {
                mafia.mafia_num++;
              }
              else if(mafia.mafiaTeam.indexOf(mafia.job[mafia.player[i]]) != -1) {
                dmsend(mafia.sendPlayer[i], "**마피아와 접선하고 마피아를 보조하세요!**");
              }
              else {
                mafia.citizen_num++;
              }
              mafia.life[mafia.player[i]] = 1;
              mafia.voted[mafia.player[i]] = 1;
            }
            mafia_start();
          }
        }




        if(args.startsWith("지목 ")) {
          if(! mafia.start) {
            dmsend(message.author, "**게임이 시작되지 않았습니다.**");
          }
          else if(mafia.life[sender] == 0) {
            dmsend(message.author, "**죽은 사람은 지목할 수 없습니다.**");
          }
          else if(mafia.daylight == 0) {
            dmsend(message.author, "**밤에만 지목이 가능합니다.**");
          }
          else if(mafia.can_pointer[sender] == 0) {
            dmsend(message.author, "**지목할 수 없는 직업입니다.**");
          }
          else if(mafia.can_pointer[sender] == 2) {
            dmsend(message.author, "**이미 "+mafia.pointer[sender]+"님을 지목하였습니다.**");
          }
          else if(mafia.can_pointer[sender] == 3) {
            dmsend(message.author, "**더 이상 능력을 사용할 수 없습니다.**");
          }
          else if(mafia.can_pointer[sender] == 4) {
            dmsend(message.author, "**유혹을 당해 능력을 사용할 수 없습니다.**");
          }
          else if(mafia.player.indexOf(args.substring(3)) == -1) {
            dmsend(message.author, "**해당 닉네임을 발견할 수 없습니다: **``"+args.substring(3)+"``");
          }
          else if(mafia.day == 1 && mafia.job[sender] == "기자") {
            dmsend(message.author, "**첫 번째 날에는 취재할 수 없습니다.**");
          }
          else if((mafia.job[sender] == "영매" || mafia.job[sender] == "성직자") && mafia.life[args.substring(3)] == 1) {
            dmsend(message.author, "**살아있는 사람을 선택할 수 없습니다.**");
          }
          else if(mafia.job[sender] == "마피아") {
            mafia.mafia_pointer = args.substring(3);
            mafia.pointed_mafia = sender;
            for(var i=0;i<mafia.player.length;i++) {
              if(mafia.job[mafia.player[i]] == "마피아") {
                dmsend(mafia.sendPlayer[i], "**"+sender+"님이 "+mafia.mafia_pointer+"님을 지목하였습니다.**");
              }
            }
          }
          else {
            mafia.pointer[sender] = args.substring(3);
            dmsend(message.author, "**"+args.substring(3)+"님을 지목하였습니다.**");
            var job = mafia.job[sender];
            if(mafia.one_skill.indexOf(job) != -1) {
              mafia.can_pointer[sender] = 2;
            }
            if(job == "경찰") {
              if(mafia.job[mafia.pointer[sender]] == "마피아") {
                dmsend(message.author, "**"+mafia.pointer[sender]+"님은 마피아입니다.**");
              }
              else {
                dmsend(message.author, "**"+mafia.pointer[sender]+"님은 마피아가 아닙니다.**");
              }
            }
            else if(job == "스파이") {
              dmsend(message.author, "**"+mafia.pointer[sender]+"님의 직업은 "+mafia.job[mafia.pointer[sender]]+"입니다.**");
              if(mafia.job[mafia.pointer[sender]] == "마피아") {
                mafia.hook_up = true;
                dmsend(message.author, "**마피아와 접선했습니다.**");
                for(var i=0;i<mafia.player.length;i++) {
                  if(mafia.job[mafia.player[i]] == "마피아") {
                    dmsend(mafia.sendPlayer[i], "**스파이와 접선했습니다.**");
                  }
                }
              }
            }
            else if(job == "의사") {
              mafia.doctor_pointer = args.substring(3);
            }
            else if(job == "마술사") {
              mafia.disguise = args.substring(3);
            }
            else if(job == "건달") {
              mafia.threat = args.substring(3);
              var threat_user = mafia.sendPlayer[mafia.sender.indexOf(args.substring(3))];
              dmsend(threat_user, "**의문의 괴한으로부터 협박을 받았습니다.**");
            }
            else if(job == "변호사") {
              mafia.defense = args.substring(3);
              var defense_user = mafia.sendPlayer[mafia.sender.indexOf(args.substring(3))];
              dmsend(defense_user, "**변호사가 당신을 변호하기로 하였습니다.**");
            }
            else if(job == "주술사") {
              if(mafia.job[mafia.pointer[sender]] == "마피아") {
                mafia.hook_up = true;
                dmsend(message.author, "**마피아와 접선했습니다.**");
                for(var i=0;i<mafia.player.length;i++) {
                  if(mafia.job[mafia.player[i]] == "마피아") {
                    dmsend(mafia.sendPlayer[i], "**주술사와 접선했습니다.**");
                  }
                }
              }
              else {
                mafia.inc = args.substring(3);
                var incantation_user = mafia.sendPlayer[mafia.sender.indexOf(args.substring(3))];
                dmsend(incantation_user, "**누군가 당신에게 주술을 걸었습니다.**");
              }
            }
          }
        }

        if(args.startsWith("투표 ")) {
          if(! mafia.start) {
            dmsend(message.author, "**게임이 시작되지 않았습니다.**");
          }
          else if(mafia.life[sender] == 0) {
            dmsend(message.author, "**죽은 사람은 투표할 수 없습니다.**");
          }
          else if(mafia.vote != 1) {
            dmsend(message.author, "**투표시간이 아닙니다.**");
          }
          else if(mafia.player.indexOf(args.substring(3)) == -1) {
            dmsend(message.author, "**해당 닉네임을 발견할 수 없습니다: **``"+args.substring(3)+"``");
          }
          else if(mafia.threat == sender) {
            dmsend(message.author, "협박을 당하여 투표를 할 수 없습니다.");
          }
          else if(mafia.inc == sender) {
            dmsend(message.author, "주술에 걸려 투표를 할 수 없습니다.");
          }
          else if(mafia.invisible && mafia.job[sender] == "은신술사") {
            dmsend(message.author, "은신을 하여 투표를 할 수 없습니다.");
          }
          else if(args.substring(3) == mafia.defense) {
            dmsend(message.author, mafia.defense+"님을 변호사가 변호하였습니다.");
          }
          else if(mafia.voted[sender] == 0) {
            dmsend(message.author, "이미 투표하였습니다.");
          }
          else {
            var job = mafia.job[sender];
            mafia.voted[sender] = 0;
            mafia.voting[args.substring(3)]++;
            dmsend(message.author, args.substring(3)+"님을 투표하였습니다.");
            mafia_system(args.substring(3)+" 한 표!");
            if(job == "주술사" && mafia.inc != false) {
              if(mafia.threat == mafia.inc) {
                dmsend(mafia.sendPlayer[mafia.player.indexOf(inc)], "협박을 당하여 투표를 할 수 없습니다.");
              }
              else if(mafia.invisible && mafia.job[mafia.inc] == "은신술사") {
                dmsend(mafia.sendPlayer[mafia.player.indexOf(inc)], "은신을 하여 투표를 할 수 없습니다.");
              }
              else if(args.substring(3) == mafia.defense) {
                dmsend(mafia.sendPlayer[mafia.player.indexOf(inc)], mafia.defense+"님을 변호사가 변호하였습니다.");
              }
              else {
                mafia.voting[args.substring(3)]++;
                dmsend(mafia.sendPlayer[mafia.player.indexOf(inc)], args.substring(3)+"님을 투표하였습니다.");
                mafia_system(args.substring(3)+" 한 표!");
              }
            }
            if(job == "마담") {
              if(mafia.job[args.substring(3)] == "마피아") {
                mafia.hook_up = true;
                dmsend(message.author, "**마피아와 접선했습니다.**");
                for(var i=0;i<mafia.player.length;i++) {
                  if(mafia.job[mafia.player[i]] == "마피아") {
                    dmsend(mafia.sendPlayer[i], "**마담과 접선했습니다.**");
                  }
                }
              }
              else {
                mafia.can_pointer[args.substring(3)] = 4;
                dmsend(message.author, args.substring(3)+"님을 유혹하였습니다.");
                dmsend(mafia.sendPlayer[mafia.player.indexOf(args.substring(3))], "유혹당했습니다.");
              }
            }
          }
        }

        if(args.toLowerCase() == "찬성") {
          if(! mafia.start) {
            dmsend(message.author, "**게임이 시작되지 않았습니다.**");
          }
          else if(mafia.life[sender] == 0) {
            dmsend(message.author, "**죽은 사람은 투표할 수 없습니다.**");
          }
          else if(mafia.vote != 2) {
            dmsend(message.author, "**투표시간이 아닙니다.**");
          }
          else if(mafia.threat == sender) {
            dmsend(message.author, "협박을 당하여 투표를 할 수 없습니다.");
          }
          else if(mafia.invisible && mafia.job[sender] == "은신술사") {
            dmsend(message.author, "은신을 하여 투표를 할 수 없습니다.");
          }
          else if(mafia.voted[sender] == 0) {
            dmsend(message.author, "이미 투표하였습니다.");
          }
          else {
            mafia.votegood++;
            dmsend(message.author, "찬성하였습니다.");
          }
        }

        if(args.toLowerCase() == "반대") {
          if(! mafia.start) {
            dmsend(message.author, "**게임이 시작되지 않았습니다.**");
          }
          else if(mafia.life[sender] == 0) {
            dmsend(message.author, "**죽은 사람은 투표할 수 없습니다.**");
          }
          else if(mafia.vote != 2) {
            dmsend(message.author, "**투표시간이 아닙니다.**");
          }
          else if(mafia.threat == sender) {
            dmsend(message.author, "협박을 당하여 투표를 할 수 없습니다.");
          }
          else if(mafia.invisible && mafia.job[sender] == "은신술사") {
            dmsend(message.author, "은신을 하여 투표를 할 수 없습니다.");
          }
          else if(mafia.voted[sender] == 0) {
            dmsend(message.author, "이미 투표하였습니다.");
          }
          else {
            mafia.votebad++;
            dmsend(message.author, "반대하였습니다.");
          }
        }

      }
    }
});

bot.login(process.env.TOKEN)
