const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// helper function
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create Users
  const users = [];

  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@gmail.com`,
        password: hashedPassword,
      },
    });

    users.push(user);
  }

  console.log("👤 Users created:", users.length);

  // 2. Create Videos
  const videos = [];

  for (let i = 1; i <= 50; i++) {
    const randomUser = users[randomInt(users.length)];

    const video = await prisma.video.create({
      data: {
        title: `Video ${i}`,
        url: `https://example.com/video${i}.mp4`,
        caption: `This is TikTok video ${i}`,
        userId: randomUser.id,
      },
    });

    videos.push(video);
  }

  console.log("🎥 Videos created:", videos.length);

  // 3. Add Likes (simple simulation)
  for (let i = 0; i < 100; i++) {
    const randomUser = users[randomInt(users.length)];
    const randomVideo = videos[randomInt(videos.length)];

    try {
      await prisma.videoLike.create({
        data: {
          userId: randomUser.id,
          videoId: randomVideo.id,
        },
      });
    } catch (err) {
      // ignore duplicates
    }
  }

  console.log("❤️ Video likes created");

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });