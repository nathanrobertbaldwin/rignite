from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    blue_keyboard = Product(
        user_id=1,
        product_name="Rignite BlueSky",
        category="Keyboard",
        price=99.99,
        brand="Rignite",
        color="Blue",
        description="Designed in an elegant shade of vibrant blue, this keyboard is not only a visual delight but also a reflection of your unique style and passion for technology. The sleek, compact design complements any setup, making it a centerpiece on your desk that will impress and inspire envy among fellow enthusiasts. Engineered with precision, the Rignite BlueSky Keyboard offers customizable RGB backlighting, empowering you to create a personalized ambiance that matches your mood and style. Choose from a wide array of lighting effects and colors, immersing yourself in a mesmerizing display of colors that syncs perfectly with your computing setup.",
        specs="Keyboard Specifications, Keyboard Type: Mechanical Keyboard, Switch Type: Clicky Mechanical Switches (Cherry MX Blue or equivalent), Key Lifespan: 50 million keystrokes, Key Rollover: Full N-Key Rollover (NKRO) with Anti-Ghosting, Backlighting: Customizable RGB Backlighting with multiple lighting effects, Layout: Full-sized 104-key layout with additional multimedia and function keys, Connectivity: Wired USB 2.0, Gold-plated corrosion-resistant connector, Cable: Braided, Detachable USB cable for easy storage and portability, Construction: Premium ABS keycaps and aircraft-grade aluminum alloy top plate, Color: Stunning Vibrant Blue Keyboard Casing, Dimensions: 17.5 x 5.8 x 1.4 inches (L x W x H), Weight: Approx. 2.5 lbs (1.1 kg)",
    )

    red_keyboard = Product(
        user_id=1,
        product_name="Rignite RedSky Elite",
        category="Keyboard",
        price=129.99,
        brand="Rignite",
        color="Blue",
        description="Designed in an elegant shade of vibrant red, this keyboard is not only a visual delight but also a reflection of your unique style and passion for technology. The sleek, compact design complements any setup, making it a centerpiece on your desk that will impress and inspire envy among fellow enthusiasts. Engineered with precision, the Rignite RedSky Elite Keyboard offers customizable RGB backlighting, empowering you to create a personalized ambiance that matches your mood and style. Choose from a wide array of lighting effects and colors, immersing yourself in a mesmerizing display of colors that syncs perfectly with your computing setup.",
        specs="Keyboard Specifications, Keyboard Type: Mechanical Keyboard, Switch Type: Clicky Mechanical Switches (Cherry MX Blue or equivalent), Key Lifespan: 50 million keystrokes, Key Rollover: Full N-Key Rollover (NKRO) with Anti-Ghosting, Backlighting: Customizable RGB Backlighting with multiple lighting effects, Layout: Full-sized 104-key layout with additional multimedia and function keys, Connectivity: Wired USB 2.0, Gold-plated corrosion-resistant connector, Cable: Braided, Detachable USB cable for easy storage and portability, Construction: Premium ABS keycaps and aircraft-grade aluminum alloy top plate, Color: Stunning Vibrant Blue Keyboard Casing, Dimensions: 17.5 x 5.8 x 1.4 inches (L x W x H), Weight: Approx. 2.5 lbs (1.1 kg)",
    )

    mech_mouse = Product(
        user_id=1,
        product_name="Rignite MechMachine",
        category="Mouse",
        price=75.99,
        brand="Rignite",
        color="Black",
        description="Built with passion and tailored for gaming enthusiasts, the Rignite Mech Mouse is a true testament to engineering excellence. Engineered with cutting-edge technology and thoughtful design, this gaming mouse is destined to become your most trusted ally in the virtual battlefield. At the heart of the Rignite Mech Mouse lies a state-of-the-art optical sensor, delivering breathtaking precision and responsiveness with every movement. With adjustable DPI settings, seize control over your cursor speed, catering to various gaming styles, from pixel-perfect sniping to lightning-fast flick shots.",
        specs="Mouse Type: Gaming Mouse, Sensor Type: High-precision Optical Sensor, DPI Range: Adjustable DPI (Minimum: 200 DPI, Maximum: 16000 DPI), Polling Rate: Up to 1000Hz (1ms response time), Acceleration: 50G Max, Tracking Speed: 400 inches per second (IPS), Buttons: Customizable Programmable Buttons (Minimum: 6 buttons, Maximum: 12 buttons), Switches: Durable Omron Switches (rated for 50 million clicks), Ergonomics: Ergonomic Design with Contoured Curves, Weight Tuning: Customizable Weight Tuning System (Removable weights for optimal balance), Lighting: RGB Lighting with customizable colors and lighting effects, Connection: Wired USB 2.0 (Braided Cable for enhanced durability), Dimensions: Approx. 5.1 x 2.7 x 1.7 inches (L x W x H), Weight: Adjustable weight (Approx. 100g - 140g)",
    )

    slick_mouse = Product(
        user_id=1,
        product_name="Rignite MechMachine Elite",
        category="Mouse",
        price=145.99,
        brand="Rignite",
        color="Black",
        description="Built with passion and tailored for gaming enthusiasts, the Rignite MechMachine Elite Mouse is a true testament to engineering excellence. Engineered with cutting-edge technology and thoughtful design, this gaming mouse is destined to become your most trusted ally in the virtual battlefield. At the heart of the Rignite Mech Elite Mouse lies a state-of-the-art optical sensor, delivering breathtaking precision and responsiveness with every movement. With adjustable DPI settings, seize control over your cursor speed, catering to various gaming styles, from pixel-perfect sniping to lightning-fast flick shots.",
        specs="Mouse Type: Gaming Mouse, Sensor Type: High-precision Optical Sensor, DPI Range: Adjustable DPI (Minimum: 200 DPI, Maximum: 16000 DPI), Polling Rate: Up to 1000Hz (1ms response time), Acceleration: 50G Max, Tracking Speed: 400 inches per second (IPS), Buttons: Customizable Programmable Buttons (Minimum: 6 buttons, Maximum: 12 buttons), Switches: Durable Omron Switches (rated for 50 million clicks), Ergonomics: Ergonomic Design with Contoured Curves, Weight Tuning: Customizable Weight Tuning System (Removable weights for optimal balance), Lighting: RGB Lighting with customizable colors and lighting effects, Connection: Wired USB 2.0 (Braided Cable for enhanced durability), Dimensions: Approx. 5.1 x 2.7 x 1.7 inches (L x W x H), Weight: Adjustable weight (Approx. 100g - 140g)",
    )

    ameratsu_mat_red = Product(
        user_id=1,
        product_name="Ameratsu Mat Maroon",
        category="Gaming Mat",
        price=35.99,
        brand="FangKey",
        color="Red",
        description="Step into the realm of gaming luxury with our EliteAegis Stylish Gaming Mat - a true masterpiece designed to harmonize aesthetics and performance. Crafted with impeccable attention to detail, this gaming mat is the ultimate fusion of style and functionality, adding a touch of sophistication to your gaming setup. Constructed with a high-density rubber base, the EliteAegis provides a stable and slip-resistant foundation, ensuring your gaming mat stays firmly in place during the most intense battles. Say goodbye to distractions and focus solely on your gameplay with the confidence that the EliteAegis has your back.",
        specs="Material: High-Quality Micro-textured Fabric Surface, Base Material: Non-Slip Rubber Base, Dimensions: Available in multiple size options (e.g., Large, Extra-Large), Thickness: Approximately 3mm for a perfect balance of comfort and stability, Design: Sophisticated, Minimalist Design with Intricate Patterns and Tasteful Branding, Color Options: Choose from a range of stylish color options to match your setup, Surface Texture: Micro-textured surface for precise mouse tracking and accuracy, Edge Stitching: Durable Edge Stitching to prevent fraying and extend lifespan, Water-Resistant: Repels accidental spills, easy to clean, and maintain, Compatibility: Suitable for Optical and Laser Mice",
    )

    ameratsu_mat_white = Product(
        user_id=1,
        product_name="Ameratsu Mat Gold",
        category="Gaming Mat",
        price=35.99,
        brand="FangKey",
        color="White",
        description="Step into the realm of gaming luxury with our EliteAegis Stylish Gaming Mat - a true masterpiece designed to harmonize aesthetics and performance. Crafted with impeccable attention to detail, this gaming mat is the ultimate fusion of style and functionality, adding a touch of sophistication to your gaming setup. Constructed with a high-density rubber base, the EliteAegis provides a stable and slip-resistant foundation, ensuring your gaming mat stays firmly in place during the most intense battles. Say goodbye to distractions and focus solely on your gameplay with the confidence that the EliteAegis has your back.",
        specs="Material: High-Quality Micro-textured Fabric Surface, Base Material: Non-Slip Rubber Base, Dimensions: Available in multiple size options (e.g., Large, Extra-Large), Thickness: Approximately 3mm for a perfect balance of comfort and stability, Design: Sophisticated, Minimalist Design with Intricate Patterns and Tasteful Branding, Color Options: Choose from a range of stylish color options to match your setup, Surface Texture: Micro-textured surface for precise mouse tracking and accuracy, Edge Stitching: Durable Edge Stitching to prevent fraying and extend lifespan, Water-Resistant: Repels accidental spills, easy to clean, and maintain, Compatibility: Suitable for Optical and Laser Mice",
    )

    big_speaker = Product(
        user_id=1,
        product_name="HarmonySound X-1 Speaker",
        category="Speaker",
        price=35.99,
        brand="Rignite",
        color="Black",
        description="Prepare to be mesmerized by the HarmonySound X-1 Speaker, a breathtaking audio masterpiece meticulously engineered to redefine your auditory experience. Whether you're a music enthusiast, a cinephile, or a gaming aficionado, this speaker is your gateway to a realm of rich, immersive sound that transcends ordinary listening. Equipped with advanced audio drivers and cutting-edge sound processing technology, the HarmonySound X-1 delivers crystal-clear highs, resonant mids, and deep, thundering bass that vibrates through your very core. Whether you're streaming your favorite tunes, watching a thrilling blockbuster, or immersing yourself in the virtual world of gaming, the speaker's precision audio reproduction ensures every sound is faithfully delivered, elevating your entertainment to new heights.",
        specs="Speaker Specifications: Speaker Type: 2.1 Channel Wireless Speaker, Drivers: High-Performance Full-Range Drivers and Subwoofer, Total Output Power: 40 Watts (RMS), Frequency Response: 50Hz - 20kHz, Signal-to-Noise Ratio: >85dB, Bluetooth Version: Bluetooth 5.0, Connectivity: Bluetooth, AUX-in (3.5mm), USB, MicroSD Card Slot, Audio Codec Support: SBC, AAC, Supported File Formats: MP3, WAV, FLAC, Playback Controls: On-Board Control Buttons for Volume, Playback, and Mode Selection, Sound Modes: Selectable EQ Presets (e.g., Normal, Pop, Rock, Jazz, Movie, Game), Bass Enhancement: Built-in Bass Reflex System for Deep and Rich Bass, Speaker Enclosure: Wooden Enclosure for Enhanced Audio Resonance, Power Supply: AC Power Adapter (Input: 100-240V, 50/60Hz, Output: 19V, 2A), Dimensions: Approximately 10.2 x 5.5 x 6.7 inches (L x W x H), Weight: Approximately 5.5 lbs (2.5 kg)",
    )

    headset = Product(
        user_id=1,
        product_name="UltimaGamer X300",
        category="Headphones",
        price=35.99,
        brand="Rignite",
        color="White",
        description="Equipped with high-fidelity audio drivers, the UltimaGamer X300 unleashes a symphony of sound that transports you straight into the heart of the action. From thundering explosions to subtle enemy footsteps, every audio cue is rendered with exceptional clarity and depth, ensuring you don't miss a single beat in the virtual battleground. With its ergonomic design, the UltimaGamer X300 guarantees hours of gaming comfort. The plush memory foam ear cushions conform to the shape of your ears, providing a snug fit that blocks out distractions and allows you to focus solely on your gameplay. The adjustable headband ensures a perfect fit for heads of all sizes, eliminating discomfort during those marathon gaming sessions.",
        specs="Headset Specifications: Headset Type: Over-Ear Gaming Headset, Speaker Drivers: High-Fidelity Neodymium Drivers, Driver Size: 50mm, Frequency Response: 20Hz - 20kHz, Impedance: 32 ohms, Sound Quality: Stereo Sound with Surround Sound Virtualization (optional), Microphone: Detachable, Adjustable, Noise-Canceling Microphone, Microphone Sensitivity: -38dB ± 3dB, Microphone Frequency Response: 50Hz - 10kHz, Connectivity: Wired (3.5mm audio jack or USB, depending on model), Cable Length: Approximately 6 feet (1.8 meters), Multi-Platform Compatibility: PC, PlayStation, Xbox, Nintendo Switch, Mobile Devices, and more, Comfort: Adjustable Headband with Soft Memory Foam Ear Cushions, Ear Cushion Material: Breathable Protein Leather, Volume Control: In-Line Volume Control Wheel, Mute Function: In-Line Microphone Mute Switch, Noise Isolation: Over-Ear Closed-Back Design for Noise Isolation, RGB Lighting: Customizable RGB Lighting on Ear Cups",
    )

    db.session.add_all(
        [
            blue_keyboard,
            red_keyboard,
            mech_mouse,
            slick_mouse,
            ameratsu_mat_red,
            ameratsu_mat_white,
            big_speaker,
            headset,
        ]
    )
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
