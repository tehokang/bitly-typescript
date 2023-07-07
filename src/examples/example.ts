import { exit } from "process";
import { Bitly, Unit } from "../lib/bitly-client";
import { question } from "readline-sync";
import dotenv from "dotenv"

dotenv.config()

const groupId = process.env.GROUP_ID || ''
const accessToken = process.env.ACCESS_TOKEN || ''
const bitly = new Bitly("https://api-ssl.bitly.com", "v4", accessToken);

async function demonstration() {
  let result;
  let number = 1;
  let items = [
    {
      number: number++,
      title: "shorten",
      unit: async () => {
        await bitly.shorten("https://ohet.vercel.app/");
      },
    },
    {
      number: number++,
      title: "create a bitlink",
      unit: async () => {
        await bitly.createBitlink("https://ohet.vercel.app/", groupId, "Ohet BBlog");
      },
    },
    {
      number: number++,
      title: "delete a bitlink",
      unit: async () => {
        await bitly.deleteBitlink("https://ohet.vercel.app/");
      },
    },
    {
      number: number++,
      title: "update a bitlink",
      unit: async () => {
        await bitly.updateBitlink("bit.ly/46sXdFT", "Ohet BBlog", false, []);
      },
    },
    {
      number: number++,
      title: "retrieve a bitlink",
      unit: async () => {
        await bitly.retrieveBitlink("bit.ly/46sXdFT");
      },
    },
    {
      number: number++,
      title: "get a clicks for a bitlink",
      unit: async () => {
        await bitly.getClicksForBitlink("bit.ly/46sXdFT", Unit.MONTH);
      },
    },
    {
      number: number++,
      title: "create a QR code",
      unit: async () => {
        await bitly.createQRcode("bit.ly/46sXdFT");
      },
    },
    {
      number: number++,
      title: "retrieve a QR code",
      unit: async () => {
        await bitly.retrieveQRcode("bit.ly/46sXdFT");
      },
    },
    {
      number: number++,
      title: "update a QR code",
      unit: async () => {
        await bitly.updateQRcode("bit.ly/46sXdFT", {});
      },
    },
    {
      number: number++,
      title: "expand a bitlink",
      unit: async () => {
        await bitly.expandBitlink("bit.ly/46sXdFT");
      },
    },
    {
      number: number++,
      title: "get metrics for a bitlink by country (payment required)",
      unit: async () => {
        await bitly.getMetricsForBitlinkByCountry("bit.ly/46sXdFT", Unit.HOUR);
      },
    },
    {
      number: number++,
      title: "retrieve bitlinks by group",
      unit: async () => {
        await bitly.retrieveBitlinksByGroup(groupId, {});
      },
    },
    {
      number: number++,
      title: "retrieve bitlinks by group",
      unit: async () => {
        await bitly.retrieveBitlinksSorted(groupId, Unit.MONTH, 10);
      },
    },
    {
      number: 99,
      title: "Exit",
      unit: async () => {
        exit(0);
      },
    },
  ];

  while (true) {
    console.info(`-- Coordinator ---------------------`);
    for (let x of items) {
      if (x.number != 0) console.info(`${String(x.number).padStart(2, " ")}. ${x.title}`);
      else console.info(`${x.title}`);
    }
    console.info(`---------------------------------------------------`);

    const select = question("Select no: ");
    if (select == "" || select == undefined) {
      // console.clear()
      continue;
    }

    for (let x of items) {
      if (x.number == Number(select)) {
        try {
          await x.unit();
        } catch (e) {
          console.error(`e : ${e}`);
        }
      }
    }
  }
}

demonstration();
