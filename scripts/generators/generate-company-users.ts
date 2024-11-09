const skills = [
  "Java",
  "JavaScript",
  "Python",
  "TypeScript",
  "SQL",
  "HTML",
  "CSS",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Django",
  "Flask",
  "Ruby",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "Spring Boot",
  "C#",
  ".NET",
  "C++",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Objective-C",
  "Scala",
  "R",
  "Matlab",
  "GraphQL",
  "REST APIs",
  "gRPC",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Ansible",
  "AWS",
  "Azure",
  "Google Cloud Platform (GCP)",
  "Jenkins",
  "Git",
  "CI/CD",
  "Bash Scripting",
  "Linux",
  "ElasticSearch",
  "Grafana",
  "Prometheus",
  "Kibana",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "RabbitMQ",
  "Kafka",
  "Supabase",
];

const tags = [
  "Traveling",
  "Photography",
  "Hiking",
  "Cycling",
  "Running",
  "Cooking",
  "Baking",
  "Gardening",
  "Reading",
  "Writing",
  "Blogging",
  "Drawing",
  "Painting",
  "DIY projects",
  "Woodworking",
  "Knitting",
  "Sewing",
  "Fashion design",
  "Music",
  "Playing instruments",
  "Singing",
  "Songwriting",
  "Dancing",
  "Video games",
  "Board games",
  "Puzzles",
  "Yoga",
  "Meditation",
  "Fitness",
  "Weightlifting",
  "Camping",
  "Birdwatching",
  "Fishing",
  "Surfing",
  "Scuba diving",
  "Skiing",
  "Snowboarding",
  "Rock climbing",
  "Astronomy",
  "Genealogy",
  "Learning languages",
  "History",
  "Chess",
  "Collecting antiques",
  "Home brewing",
  "Wine tasting",
  "Crafting",
  "Acting",
  "Improvisation",
  "Volunteering",
  "Podcasting",
  "Public speaking",
];

const getRandomSkills = (count: number) => {
  return skills.sort(() => Math.random() - 0.5).slice(0, count);
};

const getRandomTags = (count: number) => {
  return tags.sort(() => Math.random() - 0.5).slice(0, count);
};

const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const prepareJson = (value: string) => {
  let newValue = value.replaceAll('"', '""');
  newValue = `"${newValue}"`;
  return newValue;
};

const getRandomSymbols = (count: number) => {
  return Array.from({ length: count }, () => Math.random().toString(36)[2]).join("");
};

const generateCompanyUsers = (count: number) => {
  const users = Array.from({ length: count }, () => {
    const id = getRandomValue(1, 1000000);
    return {
      email: `user${id}${getRandomSymbols(5)}@example.com`,
      password: "password",
      search_params: {
        skills: getRandomSkills(getRandomValue(1, 7)),
        tags: getRandomTags(getRandomValue(1, 4)),
      },
    };
  });

  const csvHeader = "email,password,search_params,chat_history,company_id";

  const csv = users
    .map(
      (user) =>
        `${user.email},${user.password},${prepareJson(JSON.stringify(user.search_params))},"[]",1`
    )
    .join("\n");

  console.log(csvHeader);
  console.log(csv);
};

generateCompanyUsers(10);
