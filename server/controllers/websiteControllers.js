import generateResponse from "../config/openRouter.js";
import User from "../models/userModel.js";
import Website from "../models/websiteModel.js";
import extractJson from "../utils/extractJson.js";
const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT, A SENIOR UI/UX ENGINEER,
AND A CREATIVE ART DIRECTOR SPECIALIZED IN BESPOKE WEB DESIGN.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS
❌ NO GENERIC CORPORATE TEMPLATES (Ban plain white backgrounds with standard blue buttons)
❌ NO REPETITIVE LAYOUTS (Ban standard centered hero with 3 feature columns below it)

--------------------------------------------------
USER REQUIREMENT:
USER_PROMPT
--------------------------------------------------

ART DIRECTION & CREATIVE VARIATION (CRITICAL & NON-NEGOTIABLE)
--------------------------------------------------
WARNING: You MUST NOT use a default or safe design. Based strictly on the theme of the USER REQUIREMENT, you MUST invent a HIGHLY UNIQUE, CUSTOM visual identity. 

You must dynamically decide and implement:
1. A UNIQUE COLOR PALETTE: Choose distinct background, primary, secondary, and text colors (e.g., Deep Dark Mode, Vibrant Pop-Art, Warm Earthy Pastels, High-Contrast Brutalism). Define these in CSS :root variables.
2. A UNIQUE LAYOUT STRUCTURE: Use CSS Grid to create asymmetrical layouts, split-screen hero sections, overlapping elements, or sticky sidebars. Do not just stack divs in the center.
3. DISTINCT TYPOGRAPHY: Creatively pair system fonts to match the vibe (e.g., 'Georgia' headings with 'Segoe UI' body for elegance, or 'Courier New' for a technical feel).
4. CUSTOM UI STYLING: Apply distinct border-radii (sharp edges vs. heavy rounding), unique CSS box-shadows, and creative CSS transform animations on hover.

EVERY SINGLE WEBSITE YOU GENERATE MUST LOOK VISUALLY DISTINCT FROM PREVIOUS GENERATIONS.

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px-1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID

--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction
8. The design is visibly unique and NOT a generic template.

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;
export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.credits < 50)
      return res.status(402).json({ message: "Insufficient credits" });
    const finalPrompt = masterPrompt.replace("USER_PROMPT", prompt);
    let parsed = null;

    for (let i = 0; i < 2; i++) {
      const raw = await generateResponse(
        i === 0 ? finalPrompt : finalPrompt + "\n\n RETURN ONLY RAW JSON",
      );
      parsed = await extractJson(raw);

      if (parsed && parsed.code) {
        break;
      }
    }
    if (!parsed || !parsed.code) {
      return res.status(422).json({
        message: "AI returned an invalid response. Credits were not deducted.",
      });
    }
    const website = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "ai",
          content: parsed.message,
        },
      ],
    });
    user.credits -= 50;
    await user.save();
    return res.status(200).json({
      websiteId: website._id,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.log("Error From WebController" + error);
    return res
      .status(500)
      .json({ success: false, message: `Something went wrong` + error });
  }
};
// _________________________________________________
// _________________________________________________
// _________________________________________________
// _________________________________________________
export const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!website) {
      return res.status(400).json({ message: "website Not found" });
    }
    res.status(200).json(website);
  } catch (error) {
    return res.status(500).json({ message: "Get website by id ERROR" });
  }
};

export const changes = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.credits < 25) {
      return res
        .status(200)
        .json({ message: "You don't have enough credits to generate website" });
    }
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!website) {
      return res.status(400).json({ message: "website Not found" });
    }
    const updatePrompt = `
    UPDATE THIS HTML WEBSITE.
    CURRENT CODE : ${website.latestCode}
    USER REQUEST : ${prompt}
    RETURN RAW JSON ONLY:{
    "message": "short confirmation" ,
    "code": "UPDATED FULL CODE" ,
    }
    `;
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(updatePrompt);
      parsed = await extractJson(raw);
      if (!parsed) {
        raw = await generateResponse(
          updatePrompt + "\n\n RETURN ONLY RAW JSON",
        );
        parsed = await extractJson(raw);
      }
    }
    if (!parsed.code) {
      console.log("AI RETURNED INVALID RESPONSE");
      return res.status(400).json({ message: "AI RETURNED INVALID RESPONSE" });
    }
    website.conversation.push(
      {
        role: "user",
        content: prompt,
      },
      { role: "ai", content: parsed.message },
    );
    website.latestCode = parsed.code;
    await website.save();
    user.credits -= 25;
    await user.save();
    return res.status(200).json({
      message: parsed.message,
      code: parsed.code,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "UPDATE WEBSITE ERROR" + error });
  }
};
export const getAllWebsite = async (req, res) => {
  try {
    const websites = await Website.find({ user: req.user._id });
    return res.status(200).json(websites);
  } catch (error) {
    return res.status(500).json({ message: "GET ALL WEBSITE ERROR" + error });
  }
};

export const deploy = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!website) {
      return res.status(404).json({ message: "website Not found" });
    }
    if (website.deployed && website.deployUrl) {
      return res.status(200).json({
        url: website.deployUrl,
      });
    }
    if (!website.slug) {
      website.slug =
        website.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 50) + website._id.toString().slice(-5);
    }
    website.deployed = true;
    website.deployUrl = `${process.env.FRONTEND_URL}/site/${website.slug}`;
    await website.save();
    return res.status(200).json({
      url: website.deployUrl,
    });
  } catch (error) {
    console.error("DEPLOY_ERROR:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during deployment." });
  }
};
export const deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;

    const website = await Website.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(404).json({
        message: "Website not found or you don't have permission to delete it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Website deleted successfully",
    });
  } catch (error) {
    console.error("DELETE WEBSITE ERROR:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during deletion" });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const website = await Website.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });
    if (!website) {
      return res.status(400).json({ message: "website Not found" });
    }
    return res.status(200).json(website);
  } catch (error) {
    return res.status(500).json({ message: "Get website by Slug ERROR" });
  }
};
