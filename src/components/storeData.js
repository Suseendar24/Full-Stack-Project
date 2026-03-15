import blackMythWukong from '../game cd/black myth wukong cd.webp';
import blackOps6 from '../game cd/call of duty black ops 6 cd.webp';
import blackOps7 from '../game cd/call of duty black ops 7 cd.webp';
import cricket26 from '../game cd/cricket 26 cd.webp';
import cyberpunk from '../game cd/cyberpunk cd.webp';
import eldenRing from '../game cd/elden ring shadow of the erdtree edition cd.webp';
import ghostOfYotei from '../game cd/ghost of yotei cd.webp';
import godOfWarRagnarok from '../game cd/god of war ragnarok cd.webp';
import hitman from '../game cd/hitman world of assassination cd.webp';
import silentHill2 from '../game cd/silent hill 2 cd.webp';
import tekken8 from '../game cd/tekken 8 cd.webp';

import assassinsCreed from '../games/assassins creed shadows.png';
import avatarFrontiers from '../games/avatar frontiers of pandora.png';
import chainedTogether from '../games/chained together.png';
import clairObscur from '../games/clair obscur expedition 33.png';
import cs2 from '../games/counter-strike 2 .png';
import dbd from '../games/dead by daylight.png';
import farCry5 from '../games/far cry 5.png';
import rdr2 from '../games/red dead redemption 2.png';
import repo from '../games/repo.png';
import reRequiem from '../games/resident evil requiem.png';
import wwz from '../games/world war z.png';
import wwe2k26 from '../games/wwe 2k26.png';

import cpuImage from '../hardware/CPU.webp';
import computerImage from '../hardware/computer.jpg';
import controllerImage from '../hardware/controller.webp';
import coolingPadImage from '../hardware/cooling pad.webp';
import laptopImage from '../hardware/laptop.webp';
import keyboardImage from '../hardware/mechanical keyboard.webp';
import mouseImage from '../hardware/mouse.webp';
import switchImage from '../hardware/nintedo switch.webp';
import ps5Image from '../hardware/ps5.jpg';
import phoneImage from '../hardware/smart phone.webp';
import tvImage from '../hardware/television.webp';

export const hardwareProducts = [
  { id: 'hw_0', name: 'Premium Monitor', category: 'Display', price: 400, image: tvImage, specs: { resolution: '4K Ultra HD', refresh: '144Hz', panel: 'IPS', response: '1ms' } },
  { id: 'hw_1', name: 'Gaming Mouse', category: 'Peripherals', price: 80, image: mouseImage, specs: { dpi: '25,000 DPI', sensor: 'Hero 25K', buttons: '11', weight: '80g' } },
  { id: 'hw_2', name: 'Mechanical Keyboard', category: 'Peripherals', price: 150, image: keyboardImage, specs: { switches: 'Cherry MX Blue', layout: 'Full Size', RGB: 'Per-key', connectivity: 'Wired' } },
  { id: 'hw_3', name: 'Gaming Laptop', category: 'Laptop', price: 1500, image: laptopImage, specs: { cpu: 'Core i9-13900K', gpu: 'RTX 4080', ram: '32GB DDR5', storage: '2TB SSD' } },
  { id: 'hw_4', name: 'PlayStation 5', category: 'Console', price: 500, image: ps5Image, specs: { storage: '825GB SSD', type: 'Disc Edition', resolution: 'Up to 8K', fps: 'Up to 120fps' } },
  { id: 'hw_5', name: 'Nintendo Switch', category: 'Console', price: 450, image: switchImage, specs: { type: 'Hybrid', OLED: 'Yes', storage: '64GB', battery: 'Up to 9h' } },
  { id: 'hw_6', name: 'Pro Controller', category: 'Accessory', price: 70, image: controllerImage, specs: { haptic: 'Advanced Feedback', runtime: '40h', compatibility: 'Console/PC' } },
  { id: 'hw_7', name: 'Cooling Pad', category: 'Accessory', price: 50, image: coolingPadImage, specs: { fans: '5 High-speed', RGB: 'Dynamic', speed: 'Adjustable', noise: 'Silent' } },
  { id: 'hw_8', name: 'Gaming Phone', category: 'Mobile', price: 800, image: phoneImage, specs: { screen: '120Hz AMOLED', ram: '16GB', cpu: 'Snapdragon 8 Gen 2', battery: '6000mAh' } },
  { id: 'hw_9', name: 'High-End CPU', category: 'Components', price: 1200, image: cpuImage, specs: { cores: '24 Cores', threads: '32 Threads', speed: '5.8GHz Boost', socket: 'LGA1700' } },
  { id: 'hw_10', name: 'Gaming PC Build', category: 'Desktop', price: 2500, image: computerImage, specs: { case: 'Full Tower', cooling: 'Liquid AIO', psu: '1000W Gold', os: 'Windows 11' } },
];

export const cdGames = [
  { id: 'cd_0', name: 'Black Myth: Wukong', platform: 'PS5', price: 60, category: 'Action RPG', image: blackMythWukong },
  { id: 'cd_1', name: 'Call of Duty: Black Ops 6', platform: 'PS5', price: 70, category: 'Shooter', image: blackOps6 },
  { id: 'cd_2', name: 'Call of Duty: Black Ops 7', platform: 'PS5', price: 70, category: 'Shooter', image: blackOps7 },
  { id: 'cd_3', name: 'Cricket 26', platform: 'PS5', price: 50, category: 'Sports', image: cricket26 },
  { id: 'cd_4', name: 'Cyberpunk 2077', platform: 'PS5', price: 40, category: 'RPG', image: cyberpunk },
  { id: 'cd_5', name: 'Elden Ring: Shadow of the Erdtree', platform: 'PS5', price: 80, category: 'RPG', image: eldenRing },
  { id: 'cd_6', name: 'Ghost of Yotei', platform: 'PS5', price: 70, category: 'Action', image: ghostOfYotei },
  { id: 'cd_7', name: 'God of War Ragnarok', platform: 'PS5', price: 60, category: 'Action', image: godOfWarRagnarok },
  { id: 'cd_8', name: 'Hitman World of Assassination', platform: 'PS5', price: 50, category: 'Stealth', image: hitman },
  { id: 'cd_9', name: 'Silent Hill 2', platform: 'PS5', price: 70, category: 'Horror', image: silentHill2 },
  { id: 'cd_10', name: 'Tekken 8', platform: 'PS5', price: 60, category: 'Fighting', image: tekken8 },
];

export const digitalGames = [
  { id: 'dig_0', name: "Assassin's Creed Shadows", price: 70, image: assassinsCreed },
  { id: 'dig_1', name: 'Avatar: Frontiers of Pandora', price: 60, image: avatarFrontiers },
  { id: 'dig_2', name: 'Chained Together', price: 15, image: chainedTogether },
  { id: 'dig_3', name: 'Clair Obscur: Expedition 33', price: 50, image: clairObscur },
  { id: 'dig_4', name: 'Counter-Strike 2', price: 0, image: cs2 },
  { id: 'dig_5', name: 'Dead by Daylight', price: 20, image: dbd },
  { id: 'dig_6', name: 'Far Cry 5', price: 20, image: farCry5 },
  { id: 'dig_7', name: 'Red Dead Redemption 2', price: 40, image: rdr2 },
  { id: 'dig_8', name: 'REPO', price: 10, image: repo },
  { id: 'dig_9', name: 'Resident Evil Requiem', price: 60, image: reRequiem },
  { id: 'dig_10', name: 'World War Z', price: 30, image: wwz },
  { id: 'dig_11', name: 'WWE 2K26', price: 70, image: wwe2k26 },
];
