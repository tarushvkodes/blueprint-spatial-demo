import {
  Calculator,
  Code2,
  FileCheck2,
  HandCoins,
  PackageCheck,
  Route,
  SlidersHorizontal,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { ProjectData } from './types'

export const navItems = ['Strategy', 'Design', 'BOM', 'Physics', 'CAD', 'Code', 'Build', 'Chat'] as const

export const defaultBlueprintQuestion = 'Can we make the selected robot cheaper without losing reliable autonomous?'

export const sourceArtifacts = [
  {
    title: 'DECODE manual TU32',
    kind: 'Official FTC PDF',
    detail: '188 pages indexed for game overview, scoring windows, robot construction rules, and inspection language.',
    href: 'docs/decode-competition-manual-tu32.pdf',
  },
  {
    title: 'Blueprint MVP writeup',
    kind: 'Product requirements',
    detail: '70 pages covering strategy, RAG citations, REV BOMs, physics math, CAD, Java code, grants, and driver logs.',
    href: 'docs/blueprint-mvp-writeup.pdf',
  },
  {
    title: 'Metal Magic guidance',
    kind: 'Pitch rubric',
    detail: 'Hook, problem, solution, UVP, demo clarity, and audience engagement criteria for the presentation.',
    href: 'docs/metal-magic-mvp-marketing-presentation.pdf',
  },
]

export const generatedOutputs = [
  'Cited DECODE strategy brief',
  'Three robot architectures',
  'REV-first BOM and budget',
  'Torque, RPM, gear ratio math',
  'Conceptual CAD assembly',
  'FTC SDK Java starter pack',
  'Build and test checklist',
  'Sponsor email and grant draft',
  'Driver control optimization',
]

export const profilePriorities = [
  'Low cost',
  'Reliable autonomous',
  'Easy maintenance',
  'Simple driver control',
  'Alliance-friendly scoring',
]

export const manifesto =
  'Blueprint turns a kickoff panic into an engineering workspace where every strategy, part, mechanism, code file, build step, and sponsor draft stays connected to rules, math, budget, and student decisions.'

export const fallbackProject: ProjectData = {
  team: {
    name: 'Metal Magic FTC',
    number: 'Prototype',
    location: 'Virginia',
    experience: 'Intermediate',
    students: 9,
    mentors: 2,
    budget: 1500,
    supplier: 'REV Robotics',
    manual: 'DECODE Competition Manual TU32',
    tools: ['basic hand tools', '3D printer'],
    priorities: ['reliable autonomous', 'easy maintenance', 'simple driver control'],
    inventory: ['REV Starter Kit V3.1'],
    timelineWeeks: 6,
    goals: 'Build a reliable, legal FTC robot that students can understand and iterate.',
    constraints: 'Keep the design inside FTC starting configuration and budget.',
    strategyMode: 'hybrid',
    strategyNotes: 'Prefer a conservative first robot plan with clear tradeoffs before adding high-risk mechanisms.',
    cadExperience: 'Beginner',
    programmingExperience: 'Beginner',
    buildSpace: 'Classroom or garage build space',
  },
  season: {
    seasonName: 'DECODE',
    manualVersion: 'TU32',
    title: 'DECODE Competition Manual TU32',
    isSample: true,
    scoringSummary: 'Sample DECODE season data is shown until a current FTC manual is uploaded.',
    robotConstraints: ['Upload the current official manual to replace sample constraints.'],
  },
  generatedBy: 'local-fallback',
  aiFallbackReason: 'No live project loaded yet.',
  sourceDocuments: [],
  artifactUrls: {},
  concepts: [
    {
      name: 'Reliable Decode Scorer',
      difficulty: 'Beginner-safe',
      cost: 927,
      buildTime: '3-4 weeks',
      fit: 'Alliance-friendly ARTIFACT handling with a conservative tank drivetrain, simple guide, and low penalty exposure.',
      mechanisms: ['Tank drivetrain', 'Passive ARTIFACT guide', 'Single-stage lift', 'Servo gate actuator'],
      risks: ['Lower top speed', 'Limited reach', 'Relies on clean driver cycles'],
    },
    {
      name: 'Balanced Cycle Machine',
      difficulty: 'Intermediate',
      cost: 1248,
      buildTime: '5-6 weeks',
      fit: 'Fast DECODE cycles, starter autonomous, and maintainable REV-first mechanisms inside a realistic budget.',
      mechanisms: ['Mecanum drivetrain', 'Linear slide', 'Active ARTIFACT intake', 'Preset scoring macros'],
      risks: ['Needs driver practice', 'Slide alignment matters', 'More tuning time'],
    },
    {
      name: 'High Ceiling Vision Rig',
      difficulty: 'Advanced',
      cost: 1715,
      buildTime: '7+ weeks',
      fit: 'Aggressive autonomous and high-scoring teleop specialization with AprilTag-assisted alignment.',
      mechanisms: ['Mecanum drivetrain', 'Multi-stage lift', 'Vision alignment', 'Driver macro controls'],
      risks: ['Over budget', 'More code tuning'],
    },
  ],
  rules: [
    {
      rule: 'I304-I305',
      section: 'Competition Eligibility and Inspection',
      status: 'Review needed',
      confidence: 'High',
      note: 'The robot and supporting mechanisms must be presented for inspection, and post-inspection modifications can trigger re-inspection.',
    },
    {
      rule: 'Section 12',
      section: 'ROBOT Construction Rules',
      status: 'Cited check',
      confidence: 'Medium',
      note: 'Blueprint labels CAD as conceptual and requires teams to verify dimensions, fasteners, clearances, and legality before inspection.',
    },
    {
      rule: '10.3.1',
      section: 'SCORING ELEMENTS',
      status: 'Game input',
      confidence: 'High',
      note: 'DECODE stages purple and green ARTIFACTS; the intake geometry assumes variation in 5 in. nominal Gopher balls.',
    },
  ],
  bom: [
    { subsystem: 'Drivetrain', sku: 'REV-45-3529', part: 'FTC Starter Kit V3.1 reused base', qty: 1, price: 695, stock: 'last checked' },
    { subsystem: 'Drivetrain', sku: 'REV-41-1650', part: 'Mecanum wheel set', qty: 1, price: 120, stock: 'last checked' },
    { subsystem: 'Lift', sku: 'REV-41-1301', part: '15mm extrusion bundle', qty: 2, price: 42, stock: 'last checked' },
    { subsystem: 'Lift', sku: 'REV-41-1600', part: 'UltraPlanetary gearbox kit', qty: 1, price: 95, stock: 'last checked' },
    { subsystem: 'Controls', sku: 'REV-31-1595', part: 'Distance sensor', qty: 1, price: 35, stock: 'last checked' },
    { subsystem: 'Spares', sku: 'REV-41-1324', part: 'Shaft collars and fasteners', qty: 2, price: 18, stock: 'last checked' },
  ],
  physics: [
    {
      mechanism: 'Drive speed',
      formula: 'linear speed = wheel circumference x motor RPM / gear ratio',
      inputs: '96mm wheels, 312 RPM cartridge, 1:1 output, 80% efficiency estimate',
      result: 'Estimated 1.25 m/s practical speed',
      recommendation: 'Cap teleop at 78% for beginner drivers, then raise after two clean practice runs.',
      margin: 'Stable',
    },
    {
      mechanism: 'Linear lift',
      formula: 'torque required = force x pulley radius / gearbox efficiency',
      inputs: '1.6 kg carriage, 20mm pulley radius, 0.72 efficiency, 2x safety factor',
      result: 'Needs roughly 0.88 N-m at the output shaft',
      recommendation: 'Use a conservative UltraPlanetary reduction and add current alerts before stall.',
      margin: '2.1x safety',
    },
    {
      mechanism: 'ARTIFACT intake',
      formula: 'roller surface speed = pi x diameter x RPM',
      inputs: '35mm compliant roller, 250 RPM target, soft contact compression',
      result: '0.46 m/s intake surface speed',
      recommendation: 'Tune compression with spacers so imperfect ARTIFACT variation does not jam.',
      margin: 'Tunable',
    },
  ],
  buildSteps: [
    'Lock the 18 in. starting-envelope sketch, then mount the drivetrain rails and electronics plate.',
    'Assemble the ARTIFACT guide and intake rollers with adjustable spacer holes for compression tuning.',
    'Install the single-stage lift, route wires through strain relief, and set software travel limits before power tests.',
    'Load TeleOpMain, verify hardware map names, and run a wheels-off-the-ground safety test.',
    'Run two autonomous parking paths, record driver logs, and let Blueprint suggest control remaps.',
  ],
  codeFiles: ['RobotHardware.java', 'TeleOpMain.java', 'AutoDecodePark.java', 'Constants.java', 'DriverLogRecorder.java'],
  driverInsight: 'Sample logs show repeated A + Right Trigger combos during scoring. Blueprint suggests one operator macro, a slower lift-hold curve, and telemetry warnings when current spikes.',
  sponsorDraft: 'Subject: Help Metal Magic build a cited, budgeted FTC robot for DECODE',
}

export type PlatformModule = {
  title: string
  icon: LucideIcon
  span: string
  copy: string
}

export const platformModules: PlatformModule[] = [
  {
    title: 'Rules-aware project memory',
    icon: FileCheck2,
    span: 'feature-large',
    copy: 'Manual TU32, uploaded PDFs, inventory, strategy notes, CAD references, and source-aware citations live in one working context.',
  },
  {
    title: 'REV-first supply engine',
    icon: PackageCheck,
    span: 'feature-tall',
    copy: 'BOMs split required, optional, spare, already-owned, and missing parts with last-checked availability language.',
  },
  {
    title: 'Physics before vibes',
    icon: Calculator,
    span: 'feature-wide',
    copy: 'Every drivetrain, lift, arm, intake, and servo recommendation exposes assumptions, formulas, safety factor, and warnings.',
  },
  {
    title: 'FTC SDK code studio',
    icon: Code2,
    span: 'feature-wide',
    copy: 'Starter Java files, hardware maps, TeleOp, Auto, constants, telemetry, and safety limits align to generated mechanisms.',
  },
]

export const agentRows = [
  'Intake Agent collects team constraints, tools, budget, inventory, skill level, and build timeline.',
  'Rules Agent refuses legal claims without citations, manual version, section, and confidence.',
  'Strategy Agent ranks scoring priorities, alliance fit, autonomous value, penalties, and what to ignore.',
  'Mechanical Agent proposes three architectures and hands mechanism inputs to the physics verifier.',
  'Review Agent checks contradictions across BOM, code, CAD, build steps, and student safety warnings.',
]

export const codeSample = `public class TeleOpMain extends LinearOpMode {
  private final RobotHardware robot = new RobotHardware();

  @Override
  public void runOpMode() {
    robot.init(hardwareMap);
    telemetry.addLine("Blueprint hardware initialized");
    waitForStart();

    while (opModeIsActive()) {
      double drive = -gamepad1.left_stick_y * Constants.DRIVE_LIMIT;
      double turn = gamepad1.right_stick_x * Constants.TURN_LIMIT;
      robot.drive.arcade(drive, turn);
      robot.lift.holdOrMove(gamepad2.left_stick_y);
      telemetry.update();
    }
  }
}`

export function getAccordionPanels(project: ProjectData) {
  return [
    { title: 'Driver logs', icon: SlidersHorizontal, copy: project.driverInsight },
    { title: 'Grant desk', icon: HandCoins, copy: project.sponsorDraft },
    { title: 'Autonomous', icon: Route, copy: 'Generate encoder-based parking, preload scoring, path constants, and a tuning checklist.' },
    { title: 'Hardware config', icon: Wrench, copy: 'Case-sensitive FTC configuration names stay aligned with generated code.' },
  ]
}
